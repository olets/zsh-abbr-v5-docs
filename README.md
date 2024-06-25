# zsh-abbr-v5-docs

Source for [zsh-abbr](https://github.com/olets/zsh-abbr/tree/v5)'s documentation. Read the documentation at <https://zsh-abbr.olets.dev/>.

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
pnpm search:index
```

### Update external content

Some content is managed in the zsh-abbr repo. To update this repo's copy, run

```shell
pnpm update-external-content
```

### Serve and watch

```shell
pnpm docs:dev
```

## Contributing

Thanks for your interest. Contributions are welcome!

> Please note that this project is released with a [Contributor Code of Conduct](CODE_OF_CONDUCT.md). By participating in this project you agree to abide by its terms.

Check the [Issues](https://github.com/olets/zsh-abbr-v5-docs/issues) to learn whether your topic has been discussed before or if it is being worked on.

Please read [CONTRIBUTING.md](CONTRIBUTING.md) before opening a pull request.

## License

<a href="https://www.github.com/olets/zsh-abbr-v5-docs">zsh-abbr-v5-docs</a> by <a href="https://www.github.com/olets">Henry Bley-Vroman</a> is licensed under a license which is the unmodified text of <a href="https://creativecommons.org/licenses/by-nc-sa/4.0">CC BY-NC-SA 4.0</a> and the unmodified text of a <a href="https://firstdonoharm.dev/build?modules=eco,extr,media,mil,sv,usta">Hippocratic License 3</a>. It is not affiliated with Creative Commons or the Organization for Ethical Source.

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

- Human-readable license summary is modified from https://creativecommons.org/licenses/by-nc-sa/4.0. The ethics point was added.
