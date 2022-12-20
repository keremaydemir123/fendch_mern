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
  const logos: { icon: IconType; color: string }[] = [];

  tags.forEach((tag) => {
    switch (tag) {
      case 'redux':
        logos.push({ icon: SiRedux, color: '#764abc' });
        break;
      case 'tailwindcss':
        logos.push({ icon: SiTailwindcss, color: '#3490dc' });
        break;
      case 'javascript':
        logos.push({ icon: SiJavascript, color: '#f0db4f' });
        break;
      case 'html':
        logos.push({ icon: SiHtml5, color: '#e34c26' });
        break;
      case 'css':
        logos.push({ icon: SiCss3, color: '#264de4' });
        break;
      case 'angular':
        logos.push({ icon: SiAngular, color: '#dd1b16' });
        break;
      case 'react':
        logos.push({ icon: SiReact, color: '#61DBFB' });
        break;
      case 'vue':
        logos.push({ icon: SiVuedotjs, color: '#42b883' });
        break;
      case 'bootstrap':
        logos.push({ icon: SiBootstrap, color: '#563d7c' });
        break;
      default:
        break;
    }
  });

  return (
    <div
      className={`flex items-center gap-2 bg-purple bg-opacity-80 mt-2 p-2 rounded-lg justify-center ${className}`}
    >
      {logos.map((logoObj) => {
        const { icon: Icon, color } = logoObj;
        return <Icon key={color} color={color} />;
      })}
    </div>
  );
}

LogoContainer.defaultProps = {
  className: '',
};

export default LogoContainer;
