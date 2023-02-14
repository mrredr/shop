import Image from "next/image";
import styles from "@/styles/Search.module.css";
import { Raleway } from "@next/font/google";
import { useState } from "react";
import { useFetch } from "@/hooks";
import { useRouter } from "next/navigation";

const realeway = Raleway({ subsets: ["latin"] });

export const SearchBar = () => {
  const [value, setValue] = useState("");
  const [showRecent, setShowRecent] = useState(false);
  const [showPopular, setShowPopular] = useState(false);
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const { response, loading, hasError } = useFetch<{ text: string }[]>(
    `/api/popularSearch?query=${value}`
  );

  const router = useRouter();

  const handleChange = (e) => {
    const val = e.target.value;
    if (val && showRecent) {
      setShowRecent(false);
      setShowPopular(true);
    }
    if (!val && !showRecent) {
      setShowRecent(true);
      setShowPopular(false);
    }
    setValue(e.target.value);
  };

  return (
    <>
      <div className={styles.inputWrapper}>
        <Image
          src="/Search.svg"
          alt="next"
          width={20}
          height={20}
          className={styles.icon}
        />
        <input
          className={`${realeway.className} ${styles.input}`}
          type="text"
          value={value}
          placeholder="Search Product"
          onChange={handleChange}
          onFocus={() => {
            if (value) {
              setShowPopular(true);
            } else {
              setShowRecent(true);
            }
          }}
          onBlur={() => {
            setTimeout(() => {
              setShowPopular(false);
              setShowRecent(false);
            }, 1000);
          }}
          onKeyUp={(e) => {
            if (e.key == "Enter") {
              router.push(`/?query=${value}`);
              setShowPopular(false);
            }
          }}
        />
      </div>
      {showPopular && (
        <div className={`${realeway.className} ${styles.searchDropdown}`}>
          {/* {showRecent && (
            <>
              <h3>Recent searches</h3>
              <hr className={styles.hr} />
            </>
          )} */}
          {showPopular && (
            <>
              <h3>Popular searches</h3>
              <hr className={styles.hr} />
              <ul className={styles.list}>
                {response &&
                  response?.map((suggestion, index) => (
                    <li
                      key={index}
                      className={styles.item}
                      onMouseDown={() => {
                        router.push(`/?query=${suggestion.text}`);
                        setValue(suggestion.text);
                      }}
                      onMouseOver={() => {
                        router.prefetch(`/?query=${suggestion.text}`);
                      }}
                    >
                      {suggestion.text}
                    </li>
                  ))}
              </ul>
            </>
          )}
        </div>
      )}
    </>
  );
};
