# zsh-abbr-v4-docs ![GitHub release (latest by date)](https://img.shields.io/github/v/release/olets/zsh-abbr-v4-docs)

Source for [zsh-abbr legacy v4.x](https://github.com/olets/zsh-abbr/tree/v4)'s documentation. Read the documentation at <https://v4.zsh-abbr.olets.dev/>. For latest zsh-abbr version's documentation, go to <https://zsh-abbr.olets.dev/>.

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

Install dependencies by running

```shell
pnpm install
```

### Update Algolia index

```shell
pnpm algolia:index
```

### Serve and watch

```shell
pnpm docs:dev
```

## Contributing

Thanks for your interest. Contributions are welcome!

> Please note that this project is released with a [Contributor Code of Conduct](CODE_OF_CONDUCT.md). By participating in this project you agree to abide by its terms.

Check the [Issues](https://github.com/olets/zsh-abbr-v4-docs/issues) to see if your topic has been discussed before or if it is being worked on.

Please read [CONTRIBUTING.md](CONTRIBUTING.md) before opening a pull request.

## License

<a href="https://www.github.com/olets/zsh-abbr">zsh-abbr</a> by <a rel="cc:attributionURL dct:creator" property="cc:attributionName" href="https://www.github.com/olets">Henry Bley-Vroman</a> is licensed under a license which is the unmodified text of <a href="https://creativecommons.org/licenses/by-nc-sa/4.0">CC BY-NC-SA 4.0</a> and the unmodified text of a <a href="https://firstdonoharm.dev/build?modules=eco,extr,media,mil,sv,usta">Hippocratic License 3</a>. It is not affiliated with Creative Commons or the Organization for Ethical Source.

Human-readable summary of (and not a substitute for) the [LICENSE](LICENSE) file:

You are free to

- Share — copy and redistribute the material in any medium or format
- Adapt — remix, transform, and build upon the material

Under the following terms

- Attribution — You must give appropriate credit, provide a link to the license, and indicate if changes were made. You may do so in any reasonable manner, but not in any way that suggests the licensor endorses you or your use.
- Non-commercial — You may not use the material for commercial purposes.
- Ethics - You must abide by the ethical standards specified in the Hippocratic License 3 with Ecocide, Extractive Industries, US Tariff Act, Mass Surveillance, Military Activities, and Media modules.
- Preserve terms — If you remix, transform, or build upon the material, you must distribute your contributions under the same license as the original.
- No additional restrictions — You may not apply legal terms or technological measures that legally restrict others from doing anything the license permits.

## Acknowledgments

- The human-readable license summary is modified from https://creativecommons.org/licenses/by-nc-sa/4.0. The ethics point was added.
