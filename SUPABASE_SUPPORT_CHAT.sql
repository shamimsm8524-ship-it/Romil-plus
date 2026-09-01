-- ROMIL PLUS - Chat de soporte privado
-- Ejecutar una sola vez en Supabase > SQL Editor.

create extension if not exists pgcrypto;

create table if not exists public.support_conversations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  customer_email text not null,
  status text not null default 'open' check (status in ('open','resolved')),
  created_at timestamptz not null default now(),
  last_message_at timestamptz not null default now()
);

create index if not exists support_conversations_user_idx on public.support_conversations(user_id);
create index if not exists support_conversations_status_idx on public.support_conversations(status,last_message_at desc);

create table if not exists public.support_messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references public.support_conversations(id) on delete cascade,
  sender_id uuid not null references auth.users(id) on delete cascade,
  sender_role text not null check (sender_role in ('customer','admin')),
  body text,
  attachment_path text,
  attachment_type text,
  attachment_name text,
  attachment_deleted boolean not null default false,
  read_at timestamptz,
  created_at timestamptz not null default now(),
  constraint support_message_has_content check (coalesce(length(trim(body)),0) > 0 or attachment_path is not null or attachment_deleted = true)
);

create index if not exists support_messages_conversation_idx on public.support_messages(conversation_id,created_at);
create index if not exists support_messages_unread_idx on public.support_messages(sender_role,read_at);

alter table public.support_conversations enable row level security;
alter table public.support_messages enable row level security;

grant select,insert,update on public.support_conversations to authenticated;
grant select,insert,update on public.support_messages to authenticated;

drop policy if exists "support conversations read" on public.support_conversations;
create policy "support conversations read" on public.support_conversations
for select using (
  auth.uid() = user_id
  or lower(auth.jwt() ->> 'email') = 'milagroslove.1693@gmail.com'
);

drop policy if exists "support conversations create" on public.support_conversations;
create policy "support conversations create" on public.support_conversations
for insert with check (
  auth.uid() = user_id
  and lower(coalesce(auth.jwt() ->> 'email','')) = lower(customer_email)
);

drop policy if exists "support conversations update admin" on public.support_conversations;
create policy "support conversations update admin" on public.support_conversations
for update using (lower(auth.jwt() ->> 'email') = 'milagroslove.1693@gmail.com')
with check (lower(auth.jwt() ->> 'email') = 'milagroslove.1693@gmail.com');

drop policy if exists "support messages read" on public.support_messages;
create policy "support messages read" on public.support_messages
for select using (
  exists (
    select 1 from public.support_conversations c
    where c.id = support_messages.conversation_id
      and (c.user_id = auth.uid() or lower(auth.jwt() ->> 'email') = 'milagroslove.1693@gmail.com')
  )
);

drop policy if exists "support messages create" on public.support_messages;
create policy "support messages create" on public.support_messages
for insert with check (
  sender_id = auth.uid()
  and (
    (sender_role = 'customer' and exists (
      select 1 from public.support_conversations c
      where c.id = support_messages.conversation_id and c.user_id = auth.uid() and c.status = 'open'
    ))
    or
    (sender_role = 'admin' and lower(auth.jwt() ->> 'email') = 'milagroslove.1693@gmail.com')
  )
);

drop policy if exists "support messages update" on public.support_messages;
create policy "support messages update" on public.support_messages
for update using (
  exists (
    select 1 from public.support_conversations c
    where c.id = support_messages.conversation_id
      and (c.user_id = auth.uid() or lower(auth.jwt() ->> 'email') = 'milagroslove.1693@gmail.com')
  )
)
with check (
  exists (
    select 1 from public.support_conversations c
    where c.id = support_messages.conversation_id
      and (c.user_id = auth.uid() or lower(auth.jwt() ->> 'email') = 'milagroslove.1693@gmail.com')
  )
);

create or replace function public.touch_support_conversation()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  update public.support_conversations set last_message_at = new.created_at where id = new.conversation_id;
  return new;
end;
$$;

drop trigger if exists trg_touch_support_conversation on public.support_messages;
create trigger trg_touch_support_conversation
after insert on public.support_messages
for each row execute function public.touch_support_conversation();

insert into storage.buckets (id,name,public,file_size_limit,allowed_mime_types)
values (
  'support-attachments',
  'support-attachments',
  false,
  26214400,
  array['image/jpeg','image/png','image/webp','video/mp4','video/webm','video/quicktime']
)
on conflict (id) do update set
  public = false,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "support attachments upload" on storage.objects;
create policy "support attachments upload" on storage.objects
for insert to authenticated with check (
  bucket_id = 'support-attachments'
  and (storage.foldername(name))[1] = auth.uid()::text
);

drop policy if exists "support attachments read" on storage.objects;
create policy "support attachments read" on storage.objects
for select to authenticated using (
  bucket_id = 'support-attachments'
  and (
    (storage.foldername(name))[1] = auth.uid()::text
    or lower(auth.jwt() ->> 'email') = 'milagroslove.1693@gmail.com'
  )
);

drop policy if exists "support attachments delete admin" on storage.objects;
create policy "support attachments delete admin" on storage.objects
for delete to authenticated using (
  bucket_id = 'support-attachments'
  and lower(auth.jwt() ->> 'email') = 'milagroslove.1693@gmail.com'
);
