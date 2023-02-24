# Migrating between versions

[[toc]]

## Upgrading v4 to v5

1. If you've set up something custom with [Advanced&nbsp;>&nbsp;Widgets&nbsp;and&nbsp;key&nbsp;bindings](/advanced.html#widgets-and-key-bindings) and are coming from a 4.x version less than 4.8.1, migrate off deprecated functions.
    - Instead of `_abbr_widget_expand` use `abbr-expand`
    - Instead of `_abbr_widget_expand_and_accept` use `abbr-expand-and-accept`
    - Instead of `_abbr_widget_expand_and_space` use `abbr-expand-and-space`

1. If you anticipate wanting to downgrade back to v4, backing up your user abbreviations file will make things easier for you in the future.

    ```shell:no-line-numbers
    cp $ABBR_USER_ABBREVIATIONS_FILE path/to/user-abbreviations-v4.bk
    ```

1. Install the latest zsh-abbr following the instructions at [Installation](/installation.html).

1. If you use `zsh-syntax-highlighting` to highlight abbreviations, use the new snippets at [Reference&nbsp;>&nbsp;Advanced&nbsp;>&nbsp;Syntax highlighting](/advanced.html#syntax-highlighting).

## Downgrading v5 to v4

1. Back up your user abbreviations
    ```shell:no-line-numbers
    cp $ABBR_USER_ABBREVIATIONS_FILE path/to/user-abbreviations-v5.bk
    ```
1. &nbsp;
    - If you have a backup from before upgrading v4 to v5, use it
      ```shell:no-line-numbers
      mv path/to/user-abbreviations-v4.bk $ABBR_USER_ABBREVIATIONS_FILE
      ```
    - Otherwise, go through your `ABBR_USER_ABBREVIATIONS_FILE` and manually

      - Delete all multi-word abbreviations
          ```shell:no-line-numbers
          abbr "git cp"="git cherry-pick"
          abbr "gcp"="git cherry-pick"
          ```
          becomes
          ```shell:no-line-numbers
          abbr "gcp"="git cherry-pick"
          ```
      - Remove the quotation marks from all abbreviations
          ```shell:no-line-numbers
          abbr "gcp"="git cherry-pick"
          ```
          becomes
          ```shell:no-line-numbers
          abbr gcp="git cherry-pick"
          ```
1. Install v4.x
    - Plugin manager: use your manager to install zsh-abbr from branch `v4`.
    - Homebrew:
        install v4
        ```shell:no-line-numbers
        brew uninstall --force zsh-abbr && brew install olets/tap/zsh-abbr@4
        ```
        and follow the post-install instructions logged to the terminal.
    - Manual:
      - either download the latest v4.x's archive from <https://github.com/olets/zsh-abbr/releases>
      - or clone the `v4` branch:
          ```shell:no-line-numbers
          git clone https://github.com/olets/zsh-abbr --single-branch --branch v4 --depth 1
          ```
1. Restart zsh 
    ```shell:no-line-numbers
    exec zsh
    ```
