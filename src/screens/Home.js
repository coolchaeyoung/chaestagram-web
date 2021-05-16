import { gql, useQuery } from "@apollo/client";
import React from "react";
import styled from "styled-components";
import { logUserOut } from "../apollo";
import { FatText } from "../components/shared";
import Avatar from "../components/Avatar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookmark,
  faComment,
  faHeart,
  faPaperPlane,
} from "@fortawesome/free-regular-svg-icons";

const PhotoContainer = styled.div`
  background-color: white;
  border: 1px solid ${(props) => props.theme.borderColor};
  margin-bottom: 20px;
  max-width: 615px;
`;
const PhotoHeader = styled.div`
  padding: 15px;
  display: flex;
  align-items: center;
`;

const Username = styled(FatText)`
  margin-left: 15px;
`;

const PhotoFile = styled.img`
  width: 100%;
`;

const PhotoData = styled.div`
  padding: 15px;
`;

const PhotoActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  div {
    display: flex;
    align-items: center;
  }
`;

const PhotoAction = styled.div`
  margin-right: 10px;
`;

const Likes = styled(FatText)`
  margin-top: 15px;
  display: block;
`;

const FEED_QUERY = gql`
  query seeFeed {
    seeFeed {
      id
      user {
        username
        avatar
      }
      file
      caption
      likes
      comments
      createdAt
      isMine
    }
  }
`;

const testData = [
  {
    id: 1,
    user: {
      username: "chaeyoung",
      avatar:
        "https://blog.kakaocdn.net/dn/cYoXBb/btqIMWuY1qW/fSwZ4nWQ57n0cQFEXUxdd0/img.jpg",
    },
    file: "https://img8.yna.co.kr/etc/inner/KR/2019/05/08/AKR20190508114600005_02_i_P2.jpg",
    caption: "hello",
    likes: 34,
    comments: 33,
    createdAt: "2021-05-15",
    isMine: true,
  },
  {
    id: 2,
    user: {
      username: "chaeyoung",
      avatar:
        "https://blog.kakaocdn.net/dn/cYoXBb/btqIMWuY1qW/fSwZ4nWQ57n0cQFEXUxdd0/img.jpg",
    },
    file: "https://image.bugsm.co.kr/artist/images/1000/800491/80049126.jpg",
    caption: "hello",
    likes: 34,
    comments: 33,
    createdAt: "2021-05-15",
    isMine: true,
  },
];

const Home = () => {
  const { data } = useQuery(FEED_QUERY);
  return (
    <div>
      {testData.map((photo) => (
        <PhotoContainer key={photo.id}>
          <PhotoHeader>
            <Avatar lg url={photo.user.avatar} />
            <Username>{photo.user.username}</Username>
          </PhotoHeader>
          <PhotoFile src={photo.file} />
          <PhotoData>
            <PhotoActions>
              <div>
                <PhotoAction>
                  <FontAwesomeIcon size={"2x"} icon={faHeart} />
                </PhotoAction>
                <PhotoAction>
                  <FontAwesomeIcon size={"2x"} icon={faComment} />
                </PhotoAction>
                <PhotoAction>
                  <FontAwesomeIcon size={"2x"} icon={faPaperPlane} />
                </PhotoAction>
              </div>
              <div>
                <FontAwesomeIcon size={"2x"} icon={faBookmark} />
              </div>
            </PhotoActions>
            <Likes>
              {photo.likes === 1 ? "1 like" : `${photo.likes} likes`}
            </Likes>
          </PhotoData>
        </PhotoContainer>
      ))}
    </div>
  );
};

export default Home;
