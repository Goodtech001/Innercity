import React, { useState, useRef, useEffect } from "react";

type TagsInputProps = {
  suggestions: string[];
  value?: string[]; // 👈 Add this
  onChange?: (tags: string[]) => void;
};

export const TagsInput: React.FC<TagsInputProps> = ({ suggestions, value, onChange }) => {
  const [inputValue, setInputValue] = useState("");
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>(value ?? []);
  const [showDropdown, setShowDropdown] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (inputValue.trim()) {
      const filtered = suggestions.filter(
        (s) => s.toLowerCase().includes(inputValue.toLowerCase()) && !tags.includes(s),
      );
      console.log(filtered);
      console.log(inputValue);

      setFilteredSuggestions(filtered);
      setShowDropdown(filtered.length > 0);
    } else {
      setShowDropdown(false);
    }
  }, [inputValue, suggestions, tags]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  useEffect(() => {
    if (value) setTags(value);
  }, [value]);

  const addTag = (tag: string) => {
    if (!tags.includes(tag)) {
      const newTags = [...tags, tag];
      setTags(newTags);
      setInputValue("");
      setShowDropdown(false);
      onChange?.(newTags);
    }
  };

  const removeTag = (tag: string) => {
    const newTags = tags.filter((t) => t !== tag);
    setTags(newTags);
    onChange?.(newTags);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim()) {
      e.preventDefault();
      addTag(inputValue.trim());
    } else if (e.key === "Backspace" && !inputValue && tags.length) {
      removeTag(tags[tags.length - 1]);
    }
  };

  return (
    <div ref={wrapperRef} className="relative w-full rounded">
      <div className="input-field flex flex-wrap gap-1 py-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="flex items-center gap-1.5 rounded-full border border-primary/25 bg-primary/10 px-2.5 py-1 text-sm text-primary"
          >
            {tag}
            <button
              onClick={() => removeTag(tag)}
              className="flex aspect-1 items-center justify-center rounded-full border border-red-700 bg-red-100 px-1 py-px text-center text-xs leading-none text-red-700"
            >
              ×
            </button>
          </span>
        ))}
        <input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-grow border-none py-0.5 outline-none"
          placeholder="Type to add..."
        />
      </div>
      {showDropdown && (
        <ul className="absolute z-10 mt-1 max-h-40 w-full overflow-auto rounded border bg-white shadow">
          {filteredSuggestions.map((sug) => (
            <li
              key={sug}
              onClick={() => addTag(sug)}
              className="cursor-pointer px-3 py-2 hover:bg-gray-100"
            >
              {sug}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
