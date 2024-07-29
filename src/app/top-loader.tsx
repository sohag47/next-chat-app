import React from "react";
import NextTopLoader from "nextjs-toploader";

export default function TopLoader() {
  return (
    <NextTopLoader
      color="#F5A524"
      crawl={true}
      crawlSpeed={200}
      easing="ease"
      height={3}
      initialPosition={0.08}
      shadow="0 0 10px #F5A524,0 0 5px #F5A524"
      showAtBottom={false}
      showSpinner={true}
      speed={200}
      template='
            <div class="bar" role="bar">
                <div class="peg"></div>
            </div> 
            <div class="spinner" role="spinner">
                 <div class="spinner-icon"></div>
            </div>'
      zIndex={1600}
    />
  );
}
