function LogoContainer({
  tags,
  className,
}: {
  tags: string[] | undefined;
  className?: string;
}) {
  const logos: { src: string; alt: string }[] = [];

  tags?.forEach((tag) => {
    switch (tag) {
      case 'redux':
        logos.push({ src: '../assets/logos/redux.svg', alt: 'redux' });
        break;
      case 'tailwindcss':
        logos.push({
          src: '../assets/logos/tailwindcss.svg',
          alt: 'tailwindcss',
        });
        break;
      case 'javascript':
        logos.push({ src: '../assets/logos/js.png', alt: 'js' });
        break;
      case 'html':
        logos.push({ src: '../assets/logos/html.svg', alt: 'html' });
        break;
      case 'css':
        logos.push({ src: '../assets/logos/css.svg', alt: 'css' });
        break;
      case 'angular':
        logos.push({ src: '../assets/logos/angular.png', alt: 'angular' });
        break;
      case 'react':
        logos.push({ src: '../assets/logos/react.svg', alt: 'react' });
        break;
      case 'vue':
        logos.push({ src: '../assets/logos/vue.svg', alt: 'vue' });
        break;
      case 'bootstrap':
        logos.push({ src: '../assets/logos/bootstrap.svg', alt: 'bootstrap' });
        break;
      default:
        break;
    }
  });

  return (
    <div
      className={`flex items-center gap-2  bg-opacity-20 py-[6px] px-2 rounded-lg justify-center ${className}`}
    >
      {logos.map((logoObj) => {
        const { src, alt } = logoObj;
        return <img key={src} src={src} alt={alt} className="w-5 h-5" />;
      })}
    </div>
  );
}

LogoContainer.defaultProps = {
  className: '',
};

export default LogoContainer;
