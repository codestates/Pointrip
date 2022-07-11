// interface PhotoInfo {
//   setProfileImgData: (file: any) => void;
//   profileImg: any;
// }

// function ProfileImgUpload({ setProfileImgData, profileImg }: PhotoInfo) {
//   return (
//     <>
//       {profileImg[0] === undefined ? (
//         <>
//           <input
//             className="Photo"
//             type="file"
//             multiple
//             accept={".jpg,.png"}
//             onChange={(e) => setProfileImgData(e.target.files)}
//             title=" "
//           />
//           <div className="PhotoBackground">
//             <img src="./images/plusBtn.svg" alt="+" />
//           </div>
//         </>
//       ) : (
//         <input
//           className="Photo"
//           type="file"
//           multiple
//           accept={".jpg,.png"}
//           onChange={(e) => setProfileImgData(e.target.files)}
//           title=" "
//         />
//       )}
//     </>
//   );
// }
// {
//   /* <img
//             src="../images/defaultImg.jpg"
//             alt="example"
//           /> */
// }

// export default ProfileImgUpload;
