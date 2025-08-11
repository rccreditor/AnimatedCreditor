import clsx from "clsx";
import gsap from "gsap";
import { useWindowScroll } from "react-use";
import { useEffect, useRef, useState } from "react";
import { TiLocationArrow } from "react-icons/ti";
import { Link } from "react-router-dom";
import Button from "./Button";

const navItems = [
  { name: "About", path: "/about" },
  {
    name: "Courses",
    dropdown: [
      { name: "Become Private + New SOV 101", path: "/courses/become-private" },
      { name: "Junior: Operate Private", path: "/courses/junior-operate" },
      { name: "Senior: Private Business Credit", path: "/courses/senior-credit" }
    ]
  },
  {
    name: "Services",
    dropdown: [
      { name: "Live Class", path: "/services/live-class" },
      { name: "Athena LMS", path: "/services/lms" },
      { name: "Website Creation", path: "/services/website-creation" },
      { name: "Merchant Processing", path: "/services/merchant-processing" }
    ]
  },
  { name: "Membership", path: "/prologue" },
  { name: "Contact", path: "/contact" },
];

const NavBar = () => {
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isIndicatorActive, setIsIndicatorActive] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(null);

  const audioElementRef = useRef(null);
  const navContainerRef = useRef(null);

  const { y: currentScrollY } = useWindowScroll();
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const toggleAudioIndicator = () => {
    setIsAudioPlaying(prev => !prev);
    setIsIndicatorActive(prev => !prev);
  };

  useEffect(() => {
    if (isAudioPlaying) {
      audioElementRef.current.play();
    } else {
      audioElementRef.current.pause();
    }
  }, [isAudioPlaying]);

  useEffect(() => {
    if (currentScrollY === 0) {
      setIsNavVisible(true);
      navContainerRef.current.classList.remove("floating-nav");
    } else if (currentScrollY > lastScrollY) {
      setIsNavVisible(false);
      navContainerRef.current.classList.add("floating-nav");
    } else if (currentScrollY < lastScrollY) {
      setIsNavVisible(true);
      navContainerRef.current.classList.add("floating-nav");
    }
    setLastScrollY(currentScrollY);
  }, [currentScrollY, lastScrollY]);

  useEffect(() => {
    gsap.to(navContainerRef.current, {
      y: isNavVisible ? 0 : -100,
      opacity: isNavVisible ? 1 : 0,
      duration: 0.2,
    });
  }, [isNavVisible]);

  return (
    <div
      ref={navContainerRef}
      className="fixed inset-x-0 top-4 z-50 h-16 border-none transition-all duration-700 sm:inset-x-6"
    >
      <header className="absolute top-1/2 w-full -translate-y-1/2">
        <nav className="flex size-full items-center justify-between p-4">
          
          {/* Logo → Redirect to Home */}
          <div className="flex items-center gap-7">
            <Link to="/">
              <img src="/img/logo.png" alt="logo" className="w-10 cursor-pointer" />
            </Link>
            <a href="#about">
              <Button
                id="product-button"
                title="Courses"
                rightIcon={<TiLocationArrow />}
                containerClass="bg-blue-50 md:flex hidden items-center justify-center gap-1"
              />
            </a>
          </div>

          {/* Navigation */}
          <div className="flex h-full items-center">
            <div className="hidden md:flex gap-6 items-center">
              {navItems.map((item, index) => (
                <div
                  key={index}
                  className="relative group"
                  onMouseEnter={() => setDropdownOpen(item.name)}
                  onMouseLeave={() => setDropdownOpen(null)}
                >
                  {!item.dropdown ? (
                    <Link to={item.path} className="nav-hover-btn">
                      {item.name}
                    </Link>
                  ) : (
                    <>
                      <button className="nav-hover-btn">{item.name} ▾</button>
                      {dropdownOpen === item.name && (
                        <div className="absolute left-0 top-full bg-black bg-opacity-90 shadow-md rounded-md py-2 min-w-[220px] border border-gray-800">
                          {item.dropdown.map((sub, idx) => (
                            <Link
                              key={idx}
                              to={sub.path}
                              className="block px-4 py-2 text-white hover:bg-gray-700"
                            >
                              {sub.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </>
                  )}
                </div>
              ))}

              {/* Login Button */}
              <Link to="/login">
                <Button
                  title="Login"
                  containerClass="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                />
              </Link>
            </div>

            {/* Audio Button */}
            <button
              onClick={toggleAudioIndicator}
              className="ml-10 flex items-center space-x-0.5"
            >
              <audio
                ref={audioElementRef}
                className="hidden"
                src="/audio/loop.mp3"
                loop
              />
              {[1, 2, 3, 4].map(bar => (
                <div
                  key={bar}
                  className={clsx("indicator-line", {
                    active: isIndicatorActive,
                  })}
                  style={{ animationDelay: `${bar * 0.1}s` }}
                />
              ))}
            </button>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default NavBar;
