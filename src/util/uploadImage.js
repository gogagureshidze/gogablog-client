// src/utils/uploadImage.js

/**
 * Uploads an image directly from the browser to Cloudinary.
 * Your server only provides a signature — it never receives the image bytes.
 *
 * @param {File}      file        - File from <input type="file">
 * @param {string}    token       - JWT from userInfo.token
 * @param {function}  onProgress  - optional (percent: 0–100) => void
 * @returns {Promise<string>}       Cloudinary https:// URL
 */
export async function uploadImage(file, token, onProgress) {
  // Strip trailing slash so we never get double-slash URLs
  const base = (process.env.REACT_APP_SERVER_URL || "").replace(/\/$/, "");

  // ── Step 1: get a short-lived signature from your server ───────────────────
  const sigRes = await fetch(`${base}/api/upload-signature`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!sigRes.ok) {
    const err = await sigRes.json().catch(() => ({}));
    throw new Error(err.error || `Signature request failed: ${sigRes.status}`);
  }

  const { signature, timestamp, folder, api_key, cloud_name } =
    await sigRes.json();

  // ── Step 2: upload directly from browser → Cloudinary ─────────────────────
  const formData = new FormData();
  formData.append("file", file);
  formData.append("api_key", api_key);
  formData.append("timestamp", timestamp);
  formData.append("signature", signature);
  formData.append("folder", folder);

  const cloudUrl = `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`;
  console.log("From Server:", { api_key, cloud_name, signature }); // <-- ADD THIS
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", cloudUrl);

    xhr.upload.onprogress = (e) => {
      if (onProgress && e.lengthComputable) {
        onProgress(Math.round((e.loaded / e.total) * 100));
      }
    };

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        const data = JSON.parse(xhr.responseText);
        resolve(data.secure_url);
      } else {
        console.error("Cloudinary error response:", xhr.responseText);
        reject(new Error(`Cloudinary upload failed with status ${xhr.status}`));
      }
    };

    xhr.onerror = () => {
      console.error("Cloudinary XHR network error");
      reject(new Error("Network error during upload"));
    };

    xhr.send(formData);
  });
}
