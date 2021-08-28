import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { TopLayer } from "../../components/topLayer";
import avatarFull from "../../assets/avatar.png";
import avatar1 from "../../assets/avatar1.png";
import avatar2 from "../../assets/avatar2.png";
import avatar3 from "../../assets/avatar3.png";
import avatar4 from "../../assets/avatar4.png";
import avatar5 from "../../assets/avatar5.png";
import layerFull from "../../assets/layer-5.svg";
import layerTrophy from "../../assets/layer-profile.png";
import { IconTrophy } from "../../utils/icons";
import trophy1 from "../../assets/trophy2.png";
import trophy2 from "../../assets/trophy4.png";
import profileCartoon from "../../assets/profile-cartoon.jpg";
import { useAuth } from "../../context/authContext";
import { useAvatar } from "../../context/avatarContext";
import { useEditContent } from "../../callback";

const TopPart = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  gap: 50px;
  > .infoCard {
    display: flex;
    gap: 10px;
    padding: 10px;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: #fff;
    max-width: 260px;
    background-image: url(${layerFull});
    background-repeat: no-repeat;
    background-size: cover;
    border-radius: 10px;
    color: #f9f9f9;

    > button {
      background: #c0d60c;
      border: none;
      color: #8e1d1d;
      border-radius: 3px;
      font-size: 12px;
      padding: 6px 9px;
      margin-top: 10px;
      margin-left: 10px;
      cursor: pointer;
    }
  }
  @media only screen and (max-width: 700px) {
    flex-direction: column-reverse;
    justify-content: center;
  }
`;
const Wrapper = styled.div``;
const Content = styled.div`
  padding: 10px 15px;
`;
const FullAvatar = styled.div`
  max-width: 100px;
  > img {
    width: 100%;
    object-fit: cover;
    height: 100%;
  }
`;
const UserInfo = styled.div`
  padding-right: 10px;
  > div {
    display: flex;
    gap: 10px;
    > input {
      background: none;
      border: none;
      color: #fff;
    }
  }
`;

const TrophySection = styled.div`
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
const AvartarChooseSection = styled.div`
  background: linear-gradient(144deg, #5fb3db 15%, #66d1b1 85%);
  padding: 10px 15px;
  margin-top: 20px;
  border-radius: 4px;
  > h4 {
    color: #f9f9f9;
  }
`;
const AvatarImgCollection = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 50px;
  @media only screen and (max-width: 440px) {
    justify-content: space-around;
  }
  > img {
    max-width: 151px;
    max-height: 146px;
    cursor: pointer;
  }
  > img:hover {
    background: #a6eae461;
  }
`;
const CartoonIntroduction = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  > img {
    max-width: 300px;
    margin-top: 50px;
    object-fit: cover;
  }
  > .speech-bubble {
    background: #f3ccb1;
    color: #543418;
    padding: 8px;
    border-radius: 5px;
    display: inline-flex;
    position: absolute;
  }
`;
export function Profile(props) {
  const { user, setUser } = useAuth();
  const editContent = useEditContent();
  const { data: avatarCollection } = useAvatar();
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [fullname, setFullname] = useState(null);
  const [loading, setLoading] = useState(false);
  const avatarList = avatarCollection && avatarCollection[0].avatarList;

  useEffect(() => {
    if (user) {
      setFullname(user.fullname);
      setSelectedAvatar(user.avatar);
    }
  }, [user]);
  const onClickAvatar = (avatarLink) => {
    setSelectedAvatar(avatarLink);
  };
  const handleSaveProfile = async () => {
    if (fullname) {
      try {
        setLoading(true);
        const profile = {
          fullname,
          avatar: selectedAvatar ? selectedAvatar : avatarList[0].imgLink,
        };
        await editContent("users", user.id, profile);
        user.fullname = profile.fullname;
        user.avatar = profile.avatar;
        setUser({ ...user });
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }
  };
  return (
    <>
      {avatarList && (
        <Wrapper>
          <TopLayer text="Profile Section" />
          <Content>
            <TopPart>
              <div className="infoCard">
                <FullAvatar>
                  <img
                    src={
                      selectedAvatar ? selectedAvatar : avatarList[0].imgLink
                    }
                    alt=""
                  />
                </FullAvatar>
                <UserInfo>
                  <div>
                    <h5>Full name:</h5>
                    <input
                      value={fullname}
                      onChange={(e) => setFullname(e.target.value)}
                    />
                  </div>
                  <div>
                    <h5>Email:</h5>
                    <span>{user.email}</span>
                  </div>
                </UserInfo>
                <button disabled={loading} onClick={() => handleSaveProfile()}>
                  {loading === true ? "loading" : "Save"}
                </button>
              </div>
              <CartoonIntroduction>
                <p className="speech-bubble">
                  Here you can choose new avatar and see your awards.
                </p>
                <img src={profileCartoon} alt="" />
              </CartoonIntroduction>
            </TopPart>
            <AvartarChooseSection>
              <h4>Choose Avatar</h4>
              <AvatarImgCollection>
                {console.log(avatarList)}
                {avatarList &&
                  avatarList.map((avatar, i) => (
                    <img
                      key={i}
                      src={avatar.imgLink}
                      onClick={() => onClickAvatar(avatar.imgLink)}
                      alt=""
                    />
                  ))}
              </AvatarImgCollection>
            </AvartarChooseSection>
            <TrophySection>
              <div className="trophy-header">
                <IconTrophy size={25} color={"#091b4e"} />
                <h3>Awards</h3>
              </div>
              <div className="trophy-list">
                {user.awards.length !== 0 ? (
                  user.awards.map((award, i) => (
                    <img src={award.imgLink} alt="" />
                  ))
                ) : (
                  <p>You have not earn any award yet.</p>
                )}
              </div>
            </TrophySection>
          </Content>
        </Wrapper>
      )}
    </>
  );
}
