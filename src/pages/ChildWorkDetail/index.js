import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { TopLayer } from "../../components/topLayer";
import { useChildWork } from "../../context/childWorkContext";

import Gallery from "react-grid-gallery";
export function ChildWorkDetail(props) {
  const { id } = useParams();
  const { data: childWorks } = useChildWork();
  const [selectedWork, setSelectedWork] = useState(null);
  useEffect(() => {
    if (id && childWorks) {
      // change [{imgLink:"..."}] => [{src:"..."}]
      let selected = childWorks
        .find((work) => work.id === id)
        .imageArray.map((imgObj) => {
          return {
            src: imgObj.imageLink,
            thumbnail: imgObj.imageLink,
            thumbnailWidth: 320,
            thumbnailHeight: 212,
          };
        });
      setSelectedWork(selected);
    }
  }, [childWorks]);

  return (
    <>
      {console.log(selectedWork)}
      <TopLayer text={"Title"} />
      {selectedWork && <Gallery images={selectedWork} />}
    </>
  );
}
