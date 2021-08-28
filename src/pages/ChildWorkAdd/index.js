import React, { useState } from "react";
import styled from "styled-components";
import { Selectfield } from "../../components/selectField";
import { TopLayer } from "../../components/topLayer";
import { Button } from "../../components/button";
import { useCourses } from "../../context/courseContext";
import ImageUploading from "react-images-uploading";
import {
  useAddContent,
  useGetDownloadUrl,
  useUploadInStorage,
} from "../../callback";
import { useAuth } from "../../context/authContext";
import { generateId } from "../../utils/x";
import { useChildWork } from "../../context/childWorkContext";
import { useHistory } from "react-router-dom";

const QuizWrapper = styled.div`
  width: 85%;
  background: #eae6ec;
  margin: 0 auto;
  padding: 20px;
  border-radius: 6px;
  margin-top: 20px;
  > .fileUploader {
    display: none;
  }
`;
const ButtonCollection = styled.div`
  display: flex;
  gap: 5px;
`;
const AddButton = styled.div`
  max-width: 120px;
  background: #6e93ba;
  color: #fff;
  padding: 3px 5px;
  border-radius: 10px;
  text-align: center;
  cursor: pointer;
  margin: 5px 0;
`;
const RemoveButton = styled.div`
  width: 50px;
  background: #b50b0b;
  color: #fff;
  padding: 3px;
  border-radius: 10px;
  text-align: center;
  cursor: pointer;
  margin: 5px 0;
`;
const Image = styled.img`
  height: 200px;
  width: auto;
  object-fit: cover;
`;
export function ChildWorkAdd() {
  const history = useHistory()
  const { user } = useAuth();
  const { setData: setWork, data: work } = useChildWork();
  const addWork = useAddContent();
  const uploadImage = useUploadInStorage();
  const getDownloadUrl = useGetDownloadUrl();

  const { data: courses } = useCourses();
  const [coursesTitle, setCoursesTitle] = useState(null);
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);
  const maxNumber = 5;

  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    setImages(imageList);
  };

  const handleSubmit = async () => {
    if (coursesTitle && images.length > 0) {
      setLoading(true);
      let imageArray = [];
      for (let index = 0; index < images.length; index++) {
        let id = generateId();
        const imgSnap = await uploadImage(
          images[index].file,
          `works/${user.id}/${id}.jpg`
        );
        const downloadUrl = await getDownloadUrl(imgSnap);
        let obj = {
          imageLink: downloadUrl,
        };
        imageArray.push(obj);
      }
      console.log(imageArray);
      let finalWork = {
        coursesTitle,
        imageArray,
        id: generateId(),
        child: user.id,
      };
      await addWork(`works`, finalWork);
      setWork([finalWork, ...work]);
      setLoading(false);
      history.push('/child-work')
    }
  };
  return (
    <>
      {console.log(images)}
      <TopLayer text="Add Work" />
      <QuizWrapper>
        <Selectfield
          selectOption={courses}
          title="Course Title"
          value={coursesTitle}
          width={"medium"}
          nestedOption={true}
          childWork={true}
          required={true}
          onChange={(e) => {
            setCoursesTitle(e.target.value);
          }}
        />
        <ImageUploading
          multiple
          value={images}
          onChange={onChange}
          maxNumber={maxNumber}
          dataURLKey="data_url"
          acceptType={["jpg"]}
        >
          {({
            imageList,
            onImageUpload,
            onImageUpdate,
            onImageRemove,
            isDragging,
            dragProps,
          }) => (
            // write your building UI
            <div>
              <AddButton
                style={isDragging ? { color: "red" } : null}
                onClick={onImageUpload}
                {...dragProps}
              >
                Click to upload
              </AddButton>
              <p>No. of images you can upload: {maxNumber - images.length}</p>
              &nbsp;
              {imageList.map((image, index) => (
                <div key={index}>
                  <Image src={image.data_url} />
                  <ButtonCollection>
                    <AddButton onClick={() => onImageUpdate(index)}>
                      Update
                    </AddButton>
                    <RemoveButton onClick={() => onImageRemove(index)}>
                      Remove
                    </RemoveButton>
                  </ButtonCollection>
                </div>
              ))}
            </div>
          )}
        </ImageUploading>

        <Button
          buttonType="primary"
          disabled={loading}
          onClick={handleSubmit}
          margin={"20px 0"}
        >
          {loading ? "loading" : "Submit"}
        </Button>
      </QuizWrapper>
    </>
  );
}
