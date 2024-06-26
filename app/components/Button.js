'use client';
import Link from 'next/link';

function Button(props) {
  const { type, title, additionalClass, href, clickFunction } = props;
  const buttonClasses = `text-white text-lg px-4 py-1 min-w-32 h-12 max-w-32 bg-black hover:bg-rose-400 ease-in duration-300 ${additionalClass} md:inline`;

  if (href) {
    return (
      <Link href={href} passHref className={buttonClasses} >
        {title}
      </Link>
    );
  }
  
  return (
    <button
      type={type}
      className={buttonClasses}
      onClick={clickFunction}
    >
      {title}
    </button>
  )
}

export default Button