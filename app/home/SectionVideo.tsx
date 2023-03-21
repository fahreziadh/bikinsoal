"use client"

export const revalidate = 60;

const SectionVideo = () => {
  return (
    <div className="mt-20">
      <video controls={false} autoPlay muted loop playsInline>
        <source src="/demo1.mp4" type="video/mp4" />
      </video>
    </div>
  );
  // 
}

export default SectionVideo