const Footer = ({styles}: {styles: string}) => {
  const date = new Date().getFullYear();

  return (
    <footer className={`${styles ? styles : "flex justify-center"} dark:bg-[#2c2c2c]`}>
      <small>Copyright &copy; {date} | Interlink Tech Soft Ltd.</small>
    </footer>
  );
};

export default Footer;
