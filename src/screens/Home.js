import { gql, useQuery } from "@apollo/client";
import React from "react";
import Photo from "../components/feed/Photo";
import PageTitle from "../components/PageTitle";

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
      comments {
        id
        user {
          username
          avatar
        }
        payload
        isMine
        createdAt
      }
      commentNumber
      createdAt
      isMine
      isLiked
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
    comments: [
      {
        id: 1,
        user: {
          username: "chaeyoung",
          avatar:
            "https://blog.kakaocdn.net/dn/cYoXBb/btqIMWuY1qW/fSwZ4nWQ57n0cQFEXUxdd0/img.jpg",
        },
        payload: "Hello",
        isMine: true,
        createdAt: "2021-05-16",
      },
    ],
    commentNumber: 1,
    createdAt: "2021-05-15",
    isMine: true,
    isLiked: true,
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
    comments: [
      {
        id: 2,
        user: {
          username: "chaeyoung",
          avatar:
            "https://blog.kakaocdn.net/dn/cYoXBb/btqIMWuY1qW/fSwZ4nWQ57n0cQFEXUxdd0/img.jpg",
        },
        payload: "Hwo",
        isMine: false,
        createdAt: "2021-05-16",
      },
    ],
    commentNumber: 0,
    createdAt: "2021-05-15",
    isMine: true,
    isLiked: false,
  },
];

const Home = () => {
  const { data } = useQuery(FEED_QUERY);
  return (
    <div>
      <PageTitle title="Home" />
      {testData.map((photo) => (
        <Photo key={photo.id} {...photo} />
      ))}
    </div>
  );
};

export default Home;
