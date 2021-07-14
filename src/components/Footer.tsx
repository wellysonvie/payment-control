const Footer = () => {
  return (
    <footer className="py-6 text-center w-full fixed bottom-0 z-10 bg-gray-100 dark:bg-gray-800">
      <p className="text-gray-400 dark:text-gray-600">
        by{" "}
        <a
          className="hover:underline font-medium"
          href="https://github.com/wellysonvie"
          target="_blank"
          rel="noreferrer"
        >
          @wellysonvie
        </a>{" "}
        | 2021
      </p>
    </footer>
  );
};

export default Footer;
