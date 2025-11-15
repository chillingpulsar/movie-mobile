-- Storage policies for movie-storage bucket
-- Allow authenticated users to insert (upload) files
create policy "Allow authenticated users to insert files"
on storage.objects
for insert
to authenticated
with check (
  bucket_id = 'movie-storage'
);

-- Allow authenticated users to select (read) files
create policy "Allow authenticated users to select files"
on storage.objects
for select
to authenticated
using (
  bucket_id = 'movie-storage'
);

-- Allow users to update only their own files
-- Files are stored as {user_id}/filename
create policy "Allow users to update own files"
on storage.objects
for update
to authenticated
using (
  bucket_id = 'movie-storage' AND
  (storage.foldername(name))[1] = auth.uid()::text
)
with check (
  bucket_id = 'movie-storage' AND
  (storage.foldername(name))[1] = auth.uid()::text
);

-- Allow users to delete only their own files
-- Files are stored as {user_id}/filename
create policy "Allow users to delete own files"
on storage.objects
for delete
to authenticated
using (
  bucket_id = 'movie-storage' AND
  (storage.foldername(name))[1] = auth.uid()::text
);