async function  upload(file) {
    if(!file) return;
    const formData = new FormData();
    formData.append("file",file);
    formData.append("upload_preset",import.meta.env.VITE_CLOUD_UPLOAD_PRESET_NAME);

    try{
        const res = await fetch(
            `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUD_NAME}/raw/upload`,{method: "POST", body: formData}
        )
        const data = await res.json()
        return {status: 200,message: data.secure_url}
    }
    catch (err){
        return {status: 500, message: err.message};
    }
}
export {upload}