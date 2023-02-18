import Container from '../Container';
import SearchIcon from '../icons/SearchIcon';

function Logo(): JSX.Element {
  return (
    <span className="uppercase font-medium text-white whitespace-nowrap">
      crim-scape
    </span>
  );
}

function SearchBar(): JSX.Element {
  return (
    <div className="flex justify-between items-center gap-4 relative w-full max-w-xs">
      <input
        type="text"
        placeholder="SEARCH CRIM-SCAPE"
        className="bg-transparent border-none outline-none uppercase text-white text-sm w-full font-sans placeholder:text-white"
      />
      <SearchIcon color="white" size={20} />
      <span className="absolute bg-white w-full h-0.5 -bottom-3" />
    </div>
  );
}

function NavBar(): JSX.Element {
  return (
    <header className="fixed top-0 left-0 w-full z-10 pt-5 pb-2 border-b border-gray-100/30">
      <Container>
        <div className="flex justify-between items-center gap-5">
          <Logo />
          <SearchBar />
        </div>
      </Container>
    </header>
  );
}

export default NavBar;
