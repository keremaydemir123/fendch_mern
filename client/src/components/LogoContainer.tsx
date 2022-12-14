import { IconType } from 'react-icons/lib';
import {
  SiRedux,
  SiTailwindcss,
  SiJavascript,
  SiHtml5,
  SiCss3,
  SiAngular,
  SiReact,
  SiVuedotjs,
  SiBootstrap,
} from 'react-icons/si';

function LogoContainer({
  tags,
  className,
}: {
  tags: string[];
  className?: string;
}) {
  const logos: IconType[] = [];

  tags.forEach((tag) => {
    switch (tag) {
      case 'redux':
        logos.push(SiRedux);
        break;
      case 'tailwind':
        logos.push(SiTailwindcss);
        break;
      case 'javascript':
        logos.push(SiJavascript);
        break;
      case 'html':
        logos.push(SiHtml5);
        break;
      case 'css':
        logos.push(SiCss3);
        break;
      case 'angular':
        logos.push(SiAngular);
        break;
      case 'react':
        logos.push(SiReact);
        break;
      case 'vue':
        logos.push(SiVuedotjs);
        break;
      case 'bootstrap':
        logos.push(SiBootstrap);
        break;
      default:
        break;
    }
  });

  return (
    <div
      className={`flex items-center gap-2 bg-purple bg-opacity-50 mt-2 p-2 rounded-lg justify-center ${className}`}
    >
      {logos.map((Logo) => (
        <Logo key={Logo.name} />
      ))}
    </div>
  );
}

LogoContainer.defaultProps = {
  className: '',
};

export default LogoContainer;
