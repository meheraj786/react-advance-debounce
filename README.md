# 🌟 react-advance-debounce

**An advanced, type-safe React debounce hook with cancel, flush, leading & trailing support.**

This hook is perfect for handling **search inputs, API calls, or any frequently changing values** in React projects.

**Debounce** means delaying the execution of a function until after a certain amount of time has passed since it was last called. This reduces unnecessary re-renders or API requests.

---

## 📦 Installation

Install via NPM:

```bash
npm install react-advance-debounce
```

> React >=16.8 is required (because this is a hook).

---

## ⚡ Basic Usage

```tsx
import React, { useState, useEffect } from "react";
import { useDebounce } from "react-advance-debounce";

function SearchInput() {
  const [search, setSearch] = useState("");
  const { debouncedValue } = useDebounce(search, 500);

  useEffect(() => {
    // API call or expensive action
    console.log("Debounced search:", debouncedValue);
  }, [debouncedValue]);

  return (
    <input
      type="text"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      placeholder="Type to search..."
    />
  );
}

export default SearchInput;
```

**Explanation:**

* `500` is the debounce delay in milliseconds
* `debouncedValue` updates 500ms after the last change
* Prevents unnecessary API calls or re-renders

---

## 🔧 Advanced Options

`useDebounce` supports extra options:

```ts
interface UseDebounceOptions {
  leading?: boolean;   // Executes immediately on the first call
  trailing?: boolean;  // Executes on the last call after delay
}
```

### Example:

```tsx
const { debouncedValue } = useDebounce(search, 500, {
  leading: true,
  trailing: false
});
```

* `leading: true` → fires immediately when typing starts
* `trailing: false` → final value after delay will NOT fire

---

## 🛠 Cancel & Flush

The hook returns three values:

```ts
const { debouncedValue, cancel, flush } = useDebounce(value, 500);
```

1. `debouncedValue` → The debounced state
2. `cancel()` → Cancels any pending debounce
3. `flush()` → Immediately updates the debounced value

### Example:

```tsx
const { debouncedValue, cancel, flush } = useDebounce(search, 500);

<button onClick={flush}>Apply Now</button>
<button onClick={cancel}>Cancel</button>
```

---

## ✅ TypeScript & React Compatibility

* Fully generic and type-safe
* Intellisense supported
* Works with React 16.8+
* SSR safe (Next.js, Gatsby)

---

## 💡 Practical Examples

### 1️⃣ Debounced API Search

```tsx
useEffect(() => {
  if (!debouncedValue) return;
  fetch(`/api/search?q=${debouncedValue}`)
    .then(res => res.json())
    .then(data => console.log(data));
}, [debouncedValue]);
```

### 2️⃣ Auto-Save Textarea

```tsx
const { debouncedValue } = useDebounce(content, 1000);

useEffect(() => {
  localStorage.setItem("draft", debouncedValue);
}, [debouncedValue]);
```

---

## 🏗 How It Works

* Uses a timer (`setTimeout`) to delay updates
* Tracks the timer with `useRef`
* Updates the value using `useState`
* Customizable behavior via `leading` and `trailing` options

---

## ⚙️ Notes

* React must be installed
* TypeScript optional — works perfectly in JS projects
* Build-ready for npm
* Works with CRA, Vite, Next.js, and Gatsby

---

## 📌 Versioning

| Version | Change                                    |
| ------- | ----------------------------------------- |
| 1.0.0   | Initial release, basic debounce           |
| 1.1.0   | Advanced: leading/trailing, cancel, flush |
| Future  | Throttle hook, ESM/CJS dual build         |

---

## 💻 Usage in JS Projects

```js
import { useDebounce } from "react-advance-debounce";

const { debouncedValue } = useDebounce(search, 500);
```

✅ No TypeScript needed — works out of the box

---

## 📝 Summary

* Lightweight, advanced debounce hook
* Type-safe and generic
* Cancel & flush support
* Compatible with React and JS
* SSR friendly
* Perfect for search, API calls, auto-save, or any value debounce

---

## 🔗 Links

* GitHub: `https://github.com/meheraj786/react-advance-debounce`
* NPM: `https://www.npmjs.com/package/react-advance-debounce`

---

💡 **Tip for beginners:**

* Start with `leading: false, trailing: true`
* Use `cancel` or `flush` only if needed
* Test with real input scenarios for best results


তুমি কি চাইছো আমি সেটা বানাই?
