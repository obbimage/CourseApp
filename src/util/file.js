

export async function convertFileToSrc(file) {
  if (!file) {
    throw new Error('Invalid file: Please provide a valid file object.');
  }

  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      resolve(event.target.result); // Return base64 string on success
    };

    reader.onerror = (error) => {
      reject(error); // Reject with error if reading fails
    };

    reader.readAsDataURL(file);
  });
}

export function isImageFile(file) {
    if (!file) {
      throw new Error('Invalid file: Please provide a valid file object.');
    }
  
    // Check MIME type
    const mimeType = file.type;
    if (mimeType.startsWith('image/')) {
      return true;
    }else{
        return false;
    }
    
  }