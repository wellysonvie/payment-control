import ChangeThemeButton from "./ChangeThemeButton";

const Header = () => {
  return (
    <header className="bg-green-500 dark:bg-gray-700 px-5 shadow-md">
      <div className="max-w-3xl mx-auto h-20 flex justify-between items-center">
        <h1 className="font-bold text-2xl text-white dark:text-green-500 tracking-tight">
          Payment Control
        </h1>
        <div className="flex items-center">
          <ChangeThemeButton />
          <p className="text-base text-white dark:text-green-500 ml-4">
            Bem vindo, <span className="font-medium">Fulano</span>
          </p>
        </div>
      </div>
    </header>
  );
};

export default Header;
