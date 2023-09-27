import React from "react";

const ManaSymbols = ({mana}) => {
  const manaImage = {
    "{W}": "https://akamai.sscdn.co/uploadfile/letras/albuns/a/e/4/d/28880.jpg",
    "{R}": "https://play-lh.googleusercontent.com/yyk9c52Ql7jHHa_Rjtw7nZ_S_JIdMMSv2VPgZd2K8k1meHw6aYQ80YOUzoztqKHqbaE=w240-h480-rw"
  };

  return <img src={manaImage[mana]} />
};

export default ManaSymbols;