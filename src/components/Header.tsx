import Balance from "./Balance";
import ChangeThemeButton from "./ChangeThemeButton";

const Header = () => {
  return (
    <header className="bg-green-500 dark:bg-gray-700 px-5 sm:fixed top-0 w-full">
      <div className="max-w-3xl mx-auto h-40">
        <div className="w-full sm:mt-8 mt-7 flex justify-between items-center">
          <h1 className="mr-4 font-bold text-xl sm:text-2xl text-white dark:text-green-500 tracking-tight whitespace-nowrap">
            Payment Control
          </h1>
          <div className="flex items-center">
            <ChangeThemeButton />
            <p className="text-base text-white dark:text-green-500 ml-4">
              Bem vindo, <br className="block sm:hidden" />
              <span className="font-medium">Fulano</span>
            </p>
          </div>
        </div>
        <Balance />
      </div>
    </header>
  );
};

export default Header;
