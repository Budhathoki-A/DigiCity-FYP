import React, { useEffect, useState } from "react";
import styled from "styled-components";
import layerTrophy from "../../assets/layer-profile.png";
import { useGetOneDocument } from "../../callback/firestoreCallback";
import { useAuth } from "../../context/authContext";
import { IconTrophy } from "../../utils/icons";

const Card = styled.div`
  max-width: 350px;
  width: 100%;
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  justify-content: center;
`;
const FullAvatar = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: #000;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  overflow: hidden;
  > img {
    width: 100%;
    object-fit: cover;
    height: 100%;
    object-position: top;
  }
`;
const UserInfo = styled.div`
  padding-right: 10px;
  > div {
    display: flex;
    gap: 10px;
  }
`;
const TrophySection = styled.div`
  width: 86%;
  margin-top: 20px;
  border-radius: 4px;
  padding: 20px 25px;
  color: #f9f9f9;
  background: url(${layerTrophy}), linear-gradient(45deg, #2ad3b6, #99f3b1);
  > .trophy-header {
    display: flex;
    gap: 5px;
    margin-bottom: 22px;
  }
  > .trophy-list {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 5px;

    @media only screen and (max-width: 440px) {
      justify-content: space-around;
    }
    > img {
      width: 100px;
      height: 100px;
      object-fit: cover;
      overflow: hidden;
    }
  }
`;

export function ChildProfile(props) {
  const { user, setUser } = useAuth();
  const getChildProfile = useGetOneDocument();
  const [childProfile, setChildProfile] = useState(null);

  useEffect(() => {
    console.log(user, childProfile);
    if (!user.child || !user.child[0].fullname) {
      getChildProfile("users", user.child[0]).then((doc) => {
        if (doc.exists) {
          setChildProfile(doc.data());
          user["child"] = [doc.data()];
          setUser({...user});
        }
      });
    } else {
      setChildProfile(user.child[0]);
    }
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);
  return (
    <>
      {childProfile && (
        <>
          <Card>
            <FullAvatar>
              {console.log(childProfile)}
              {childProfile.avatar ? (
                <img src={childProfile.avatar} alt="" />
              ) : (
                childProfile.fullname[0].toUpperCase()
              )}
            </FullAvatar>
            <UserInfo>
              <div>
                <h5>Full name:</h5>
                <span>{childProfile.fullname}</span>
              </div>
              <div>
                <h5>Email:</h5>
                <span>{childProfile.email}</span>
              </div>
            </UserInfo>
          </Card>
          <TrophySection>
            <div className="trophy-header">
              <IconTrophy size={25} color={"#091b4e"} />
              <h3>Awards</h3>
            </div>
            <div className="trophy-list">
            {childProfile.awards.length !== 0 ?
                  childProfile.awards.map((award, i) => (
                    <img src={award.imgLink} alt="" />
                  ))
                :
                <p>Your child have not earn any award yet.</p>
                }
               
            </div>
          </TrophySection>
        </>
      )}
    </>
  );
}
