## vim.wasm

Vim uses ncurses and I haven’t found a way to compile it to wasm. There’s a repo out there called ncurses for emscripten but they say it doesn’t work for most ncurses programs, only the simple ones.

Vim.wasm doesn’t compile ncurses, it actually disables it and replaces it with drawing the vim interface using canvas!

Another challenge is that vim is interactive so like games it has an infinite loop that they transformed with (I think) asyncify.

Vim.wasm runs in a web worker.

---

## To replace - 1

```js
_this.sendMessage({kind:"exit",status:e.status})
```

with 

```js
_this.sendMessage({kind:"exit",status:
  this.FS.readFile(  Object.keys(_this.files)[0]  , { encoding: "utf8" })
})
```


## To replace - 2

```js
this.perf=msg.perf;
```

with 

```js
this.perf=msg.perf; this.files=msg.files;
```

