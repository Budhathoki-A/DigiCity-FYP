import { useCallback } from "react";
import { firebaseFirestore } from "../firebase";

export function useDeleteContent() {
  const deleteContent = useCallback(
    (collection, id) =>
      firebaseFirestore.collection(collection).doc(id).delete(),
    []
  );

  return deleteContent;
}

export function useEditContent() {
  const editContent = useCallback(
    (collection, id, data) =>
      firebaseFirestore.collection(collection).doc(id).update(data),
    []
  );

  return editContent;
}

export function useAddContent() {
  const addContent = useCallback((collection, data) => {
    return firebaseFirestore.collection(collection).doc(data.id).set(data);
  }, []);

  return addContent;
}

export function useGetOneDocument() {
  const getOneDocument = useCallback((collection, id) => {
    return firebaseFirestore.collection(collection).doc(id).get();
  }, []);

  return getOneDocument;
}
