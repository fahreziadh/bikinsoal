"use client"

const SectionVideo = () => {
  return (
    <div className="mt-20">
      <video controls={false} autoPlay muted loop playsInline className="shadow-lg">
        <source src="https://da8idql80spie.cloudfront.net/demo1.mp4" type="video/mp4" />
      </video>
    </div>
  );
  // 
}

export default SectionVideo