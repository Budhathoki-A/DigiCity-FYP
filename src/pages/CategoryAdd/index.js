import React from "react";
import { useAddContent } from "../../callback";
import {
  useGetDownloadUrl,
  useUploadInStorage,
} from "../../callback";
import { useCategory } from "../../context/categoryContext";
import { CategoryForm } from "../Category/categoryForm";

export function CategoryAdd(props) {
  const { data: categoryList, setData: setCategoryList } = useCategory();
  const addCategory = useAddContent();
  const uploadImg = useUploadInStorage();
  const getDownloadUrl = useGetDownloadUrl();
  const handleSubmit = async (category) => {
    try {
      console.log(category)
      const coursesImgSnap = await uploadImg(category.courseImg, `courses/${category.id}.jpg`);
      const courseDownloadUrl = await getDownloadUrl(coursesImgSnap);
      const quizImgSnap = await uploadImg(category.quizImg, `quiz/${category.id}.jpg`);
      const quizDownloadUrl = await getDownloadUrl(quizImgSnap);
    
      category.courseImg = courseDownloadUrl;
      category.quizImg = quizDownloadUrl
      console.log(category)
      await addCategory("category", category);
      setCategoryList([...categoryList, category]);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <CategoryForm submitCourse={handleSubmit} />
    </>
  );
}
