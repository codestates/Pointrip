import { useEffect, useRef } from "react";
import styled from "styled-components";

const id = "daum-postcode"; // script가 이미 rending 되어 있는지 확인하기 위한 ID
const src = "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";

interface AddressSearch {
  searchAddressHandle: (address: string) => void;
}



export default function SearchAddress({ searchAddressHandle }: AddressSearch) {
  const postcodeRef = useRef<HTMLDivElement | null>(null);

  const loadLayout = () => {
    window.daum.postcode.load(() => {
      const postcode = new window.daum.Postcode({
        oncomplete: function (data) {
          console.log("이건뭐나ㅑ=>" + data);
          searchAddressHandle(data.address);
        },
      });
      postcode.open();
    });
  };

  // ref는 DOM, id와 연관이 있다.
  useEffect(() => {
    const isAlready = document.getElementById(id);
    console.log("id =>", id);
    if (!isAlready) {
      const script = document.createElement("script");
      script.src = src;
      script.id = id;
      document.body.append(script);
    }
  }, []);

  console.log("다음 어쩌고=>", postcodeRef);
  // cloadLayout === 함수실행문

  return (
    <>
      <button onClick={loadLayout}>주소 검색</button>
      <div ref={postcodeRef}></div>
    </>
  );
}
