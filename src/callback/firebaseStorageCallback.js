import { useCallback } from "react";
import { firebaseStorage } from "../firebase";

export function useUploadInStorage() {
  const uploadInStorage = useCallback((data, path, base64data = null) => {
    if (base64data) {
      return firebaseStorage.ref().child(path).putString(data);
    }
    return firebaseStorage.ref().child(path).put(data);
  }, []);
  return uploadInStorage;
}

export function useGetDownloadUrl() {
  const getDownloadUrl = useCallback((data) => {
    return data.ref.getDownloadURL();
  }, []);
  return getDownloadUrl;
}

export function useDeleteFromStorage() {
  const deleteFromStorage = useCallback((path) => {
    return firebaseStorage.ref().child(path).delete();
  }, []);

  return deleteFromStorage;
}
