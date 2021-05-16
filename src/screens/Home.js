import { gql, useQuery } from "@apollo/client";
import React from "react";
import styled from "styled-components";
import { logUserOut } from "../apollo";
import { FatText } from "../components/shared";
import Avatar from "../components/Avatar";

const PhotoContainer = styled.div`
  background-color: white;
  border: 1px solid ${(props) => props.theme.borderColor};
  margin-bottom: 20px;
`;
const PhotoHeader = styled.div`
  padding: 5px 10px;
  display: flex;
  align-items: center;
`;

const Username = styled(FatText)`
  margin-left: 5px;
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
    file: "empty",
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
    file: "empty",
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
            <Avatar url={photo.user.avatar} />
            <Username>{photo.user.username}</Username>
          </PhotoHeader>
        </PhotoContainer>
      ))}
    </div>
  );
};

export default Home;
