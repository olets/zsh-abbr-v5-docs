# zsh-abbr-docs ![GitHub release (latest by date)](https://img.shields.io/github/v/release/olets/zsh-abbr-docs)

Source for zsh-abbr's documentation. Read the documentation at <https://zsh-abbr.olets.dev/>.

For the source of zsh-abbr itself, visit <https://github.com/olets/zsh-abbr>.

## Contents

- [Requirements](#requirements)
- [Contributing](#contributing)
- [License](#License)

## Requirements

- [asdf](https://asdf-vm.com/) and its Node.js plugin
- [pnpm](https://pnpm.io/)

## Development

### Clone

This project uses Git submodules. When cloning, add the `--recurse-submodules` flag to your `git clone` command.

### Setup

Run

```shell
cp .env{.example,}
```

and fill in values in `.env`.

Then install dependencies by running

```shell
pnpm
```

### Update Algolia index

```shell
pnpm algolia:index
```

### Update contributors

Contributors are managed in the zsh-abbr repo. To copy the file over, run

```shell
pnpm update-contributors
```

### Serve and watch

```shell
pnpm docs:dev
```

## Contributing

Thanks for your interest. Contributions are welcome!

> Please note that this project is released with a [Contributor Code of Conduct](CODE_OF_CONDUCT.md). By participating in this project you agree to abide by its terms.

Check the [Issues](https://github.com/olets/zsh-abbr-docs/issues) to see if your topic has been discussed before or if it is being worked on.

Please read [CONTRIBUTING.md](CONTRIBUTING.md) before opening a pull request.

## License

<p xmlns:dct="http://purl.org/dc/terms/" xmlns:cc="http://creativecommons.org/ns#" class="license-text"><a rel="cc:attributionURL" property="dct:title" href="https://www.github.com/olets/zsh-abbr-docs">zsh-abbr-docs</a> by <a rel="cc:attributionURL dct:creator" property="cc:attributionName" href="https://www.github.com/olets">Henry Bley-Vroman</a> is licensed under <a rel="license" href="https://creativecommons.org/licenses/by-nc-sa/4.0">CC BY-NC-SA 4.0</a> plus <a rel="license" href="https://firstdonoharm.dev">Hippocratic License 3</a> and stipulations inspired by the <a rel="license" href="https://skysedge.com/opensource/index.html">Sky's Edge Open Source License</a>. Persons interested in using or adapting this work for commercial purposes should contact the author.</p>

Lay summary: The license requires that reusers give credit to the creator. It allows reusers to distribute, remix, adapt, and build upon the material in any medium or format, for noncommercial purposes only. If others modify or adapt the material, they must license the modified material under identical terms.  The license prohibits the use of software to violate human rights. The license requires that derivative products differ substantially different from what they build off of. The license requires that derivative products be released under names which cannot be mistaken for the work they derive from. (If the lay summary is at odds with the full license, the full license is considered the source of truth.)

For more information on ethical licenses, see the [Organization for Ethical Source](https://ethicalsource.dev).

<img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/cc.svg?ref=chooser-v1" title="Creative Commons-licensed" alt="Creative Commons-licensed" /> <img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/by.svg?ref=chooser-v1" title="Creative Commons: Attribution" alt="Creative Commons: Attribution" /> <img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/nc.svg?ref=chooser-v1" title="Creative Commons: NonCommercial" alt="Creative Commons: NonCommercial"/> <img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/sa.svg?ref=chooser-v1" title="Creative Commons: ShareAlike" alt="Creative Commons: ShareAlike" />

For the full text of the license, see the [LICENSE](LICENSE) file.
