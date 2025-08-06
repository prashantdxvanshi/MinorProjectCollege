import React from "react";

const ProfileBanner = () => {
  return (
    <>
      <div className="">
        <div
          className="relative h-55 flex justify-between bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url('https://i1.sndcdn.com/visuals-000343571320-DeAiOo-t1240x260.jpg')",
          }}
        >
          <div className="absolute inset-0 bg-black opacity-40"></div>

          <div className="relative w-full flex justify-between">
            <div className="ml-5 flex">
              <img
                src="https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTAxL3JtNjA5LXNvbGlkaWNvbi13LTAwMi1wLnBuZw.pnghttps://www.pngmart.com/files/23/Profile-PNG-Photo.png"
                alt=""
                className="w-42 h-42 rounded-full mt-7"
              />
              <div className="mt-25 ml-6 text-white">Name</div>
            </div>

            <div className="mr-3 my-12 flex flex-col justify-between text-white">
              <div className="bg-red-400 py-2 w-32 rounded-md text-center relative left-27 cursor-pointer hover:bg-red-500">
                <span>Edit Profile</span>
              </div>
              <div className="flex justify-between space-x-2 mt-4">
                <div>
                  <span className="text-2xl">1</span>
                  <div>Reviews</div>
                </div>
                <div className="border-l h-12 w-5" />
                <div>
                  <span className="text-2xl">1</span>
                  <div>Photos</div>
                </div>
                <div className="border-l h-12 w-5" />
                <div>
                  <span className="text-2xl">1</span>
                  <div>Followers</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileBanner;
