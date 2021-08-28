import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  useGetDownloadUrl,
  useUploadInStorage,
} from "../../callback/firebaseStorageCallback";
import { useEditContent } from "../../callback/firestoreCallback";
import { useCategory } from "../../context/categoryContext";
import { CategoryForm } from "../Category/categoryForm";

export function CategoryEdit(props) {
  const categoryEdit = useEditContent();
  const uploadImg = useUploadInStorage();
  const getDownloadUrl = useGetDownloadUrl();
  const { id } = useParams();
  const { data: categoryList, setData: setCategoryList } = useCategory();

  const [currentCategory, setCurrentCategory] = useState(null);

  useEffect(() => {
    if (categoryList) {
      const selected = categoryList.find((category) => category.id === id);
      if (selected) {
        setCurrentCategory(selected);
      }
    }
  }, [id, categoryList]);

  const editCategory = async (category) => {
    try {
      delete category.id;
      console.log("1");
      if (typeof category.courseImg !== "string") {
        const coursesImgSnap = await uploadImg(
          category.courseImg,
          `courses/${id}.jpg`
        );
        const courseDownloadUrl = await getDownloadUrl(coursesImgSnap);
        category.courseImg = courseDownloadUrl;
      }
      if (typeof category.quizImg !== "string") {
        const quizImgSnap = await uploadImg(category.quizImg, `quiz/${id}.jpg`);
        const quizDownloadUrl = await getDownloadUrl(quizImgSnap);

        category.quizImg = quizDownloadUrl;
      }
      console.log(category);
      console.log("2");
      await categoryEdit("category", id, category);

      console.log("3");
      const index = categoryList.findIndex((category) => category.id === id);
      category.id = id;
      categoryList[index] = category;

      setCategoryList([...categoryList]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <CategoryForm
        currentCategory={currentCategory}
        submitCategory={editCategory}
      />
    </>
  );
}
