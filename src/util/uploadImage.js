
const API_BASE = process.env.REACT_APP_SERVER_URL || "http://localhost:5500";

/**
 * 1. Ask your server for a short-lived signed upload signature.
 * 2. POST the image file directly to Cloudinary from the browser.
 * 3. Return the secure Cloudinary URL.
 *
 * Your server never receives the image bytes — it only signs the request.
 * This is why uploads are now instant regardless of VPS location.
 *
 * @param {File}   file   - The File object from an <input type="file"> element
 * @param {string} token  - JWT auth token (same one you use for other API calls)
 * @param {function} [onProgress] - Optional callback(percent 0–100) for a progress bar
 * @returns {Promise<string>} Cloudinary secure_url
 */
export async function uploadImage(file, token, onProgress) {
  // ── Step 1: get signature from your server (fast, no image involved) ────────
  const sigRes = await fetch(`${API_BASE}/api/upload-signature`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!sigRes.ok) {
    const err = await sigRes.json().catch(() => ({}));
    throw new Error(err.error || "Failed to get upload signature");
  }

  const { signature, timestamp, folder, api_key, cloud_name } =
    await sigRes.json();

  // ── Step 2: upload directly from browser to Cloudinary ──────────────────────
  const formData = new FormData();
  formData.append("file", file);
  formData.append("signature", signature);
  formData.append("timestamp", timestamp);
  formData.append("folder", folder);
  formData.append("api_key", api_key);

  // Use XMLHttpRequest if you want an upload progress bar, otherwise fetch works too
  const cloudUrl = `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`;

  if (onProgress) {
    // XHR path — gives real upload progress
    const url = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open("POST", cloudUrl);

      xhr.upload.onprogress = (e) => {
        if (e.lengthComputable) {
          onProgress(Math.round((e.loaded / e.total) * 100));
        }
      };

      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          const data = JSON.parse(xhr.responseText);
          resolve(data.secure_url);
        } else {
          reject(new Error(`Cloudinary upload failed: ${xhr.status}`));
        }
      };

      xhr.onerror = () => reject(new Error("Network error during upload"));
      xhr.send(formData);
    });
    return url;
  }

  // Fetch path — simpler, no progress bar
  const uploadRes = await fetch(cloudUrl, { method: "POST", body: formData });
  if (!uploadRes.ok)
    throw new Error(`Cloudinary upload failed: ${uploadRes.status}`);
  const data = await uploadRes.json();
  return data.secure_url;
}
