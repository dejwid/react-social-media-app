export async function uploadUserProfileImage(
  supabase,
  userId,
  file,
  bucket,
  profileColumn,
) {
  return new Promise(async (resolve, reject) => {
    const newName = Date.now() + file.name;
    const {data,error} = await supabase.storage
      .from(bucket)
      .upload(newName, file);


    if (error) throw error;
    if (data) {
      const url = process.env.NEXT_PUBLIC_SUPABASE_URL + `/storage/v1/object/public/${bucket}/` + data.path;
      supabase.from('profiles')
        .update({
          [profileColumn]: url,
        })
        .eq('id', userId)
        .then(result => {
          if (!result.error) {
            resolve();
          } else {
            throw result.error;
          }
        });
    }
  });
}