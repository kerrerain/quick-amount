# Quicken dirty

A minimalistic webapp to generate a Quicken export.

## Run the app

Open dist/index.html. That's all.

## Run the tests

Open test.html and check the developer console (F12). That's all, again.

## Run cloc

Couting the lines of code is useful to see how much code is under our responsibility. The lesser the better.

If using a library increases too much this metric, then do not use this library, unless there's another good reason to. On the contrary, if there is too much boilerplate code and duplications, a (good) library can decrease the lines of code.

https://github.com/AlDanial/cloc

```
cloc . --json --out cloc-report.json
```