export default defineAppConfig({
  resize: {
    wrapper: 'absolute top-0 cursor-col-resize h-full flex z-50 w-4 justify-center flex-col group',
    base: 'flex h-8 w-4 flex-col items-center justify-center opacity-30 dark:opacity-40 group-hover:dark:opacity-80 group-hover:opacity-80',
    shield: 'w-full h-full absolute z-50 opacity-0 bg-transparent cursor-col-resize',
    width: {
      class: 'w-screen max-w-[var(--width)]',
      init: {
        'xs': 320,
        'sm': 384,
        'md': 448,
        'lg': 512,
        'xl': 576,
        '2xl': 672
      }
    },
    icon: {
      base: 'flex-shrink-0',
      defaultIconBase: 'h-12 w-1 rounded-full transform rotate-0 group-hover:transform bg-gray-500 dark:bg-gray-400',
      defaultIconRotatePos: 'group-hover:rotate-[15deg]',
      defaultIconRotateNeg: 'group-hover:rotate-[-15deg]',
      size: {
        '2xs': 'h-4 w-4',
        'xs': 'h-4 w-4',
        'sm': 'h-5 w-5',
        'md': 'h-5 w-5',
        'lg': 'h-5 w-5',
        'xl': 'h-6 w-6'
      }
    },
    slot: 'border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden h-full w-full',
    default: {
      width: 'md',
      size: 'xs'
    }
  },
  ui: {
    primary: 'sky',
    gray: 'cool',
    notifications: {
      // toasts position
      position: 'top-0 bottom-auto'
    },
    avatar: {
      default: {
        icon: 'i-ph-image'
      }
    },
    button: {
      default: {
        loadingIcon: 'i-ph-spinner'
      }
    },
    input: {
      default: {
        loadingIcon: 'i-ph-spinner'
      }
    },
    select: {
      default: {
        loadingIcon: 'i-ph-spinner',
        trailingIcon: 'i-ph-caret-down'
      }
    },
    selectMenu: {
      default: {
        selectedIcon: 'i-ph-check'
      }
    },
    notification: {
      default: {
        closeButton: {
          icon: 'i-ph-x'
        }
      }
    },
    commandPalette: {
      default: {
        icon: 'i-ph-magnifying-glass-duotone',
        loadingIcon: 'i-ph-spinner',
        selectedIcon: 'i-ph-check',
        emptyState: {
          icon: 'i-ph-magnifying-glass-duotone'
        },
        closeButton: {
          icon: 'i-ph-x'
        }
      }
    },
    table: {
      default: {
        sortAscIcon: 'i-ph-sort-ascending',
        sortDescIcon: 'i-ph-sort-descending',
        sortButton: {
          icon: 'i-ph-list'
        },
        loadingState: {
          icon: 'i-ph-spinner'
        },
        emptyState: {
          icon: 'i-ph-database'
        }
      }
    },
    pagination: {
      default: {
        prevButton: {
          icon: 'i-ph-arrow-left'
        },
        nextButton: {
          icon: 'i-ph-arrow-right'
        }
      }
    },
    card: {
      rounded: 'rounded-xl'
    },
    tooltip: {
      background: '!bg-background',
      popper: {
        strategy: 'absolute'
      }
    },
    breadcrumb: {
      divider: {
        base: 'w-4 h-4'
      },
      default: {
        divider: 'i-ph-caret-right'
      }
    },
    // `@nuxt/ui-pro` specific
    variables: {
      dark: {
        background: 'var(--color-gray-950)'
      }
    },
    icons: {
      dark: 'i-ph-moon-duotone',
      light: 'i-ph-sun-duotone',
      search: 'i-ph-magnifying-glass-duotone',
      external: 'i-ph-arrow-up-right',
      chevron: 'i-ph-caret-down',
      hash: 'i-ph-hash-duotone'
    },
    header: {
      wrapper: 'lg:mb-0 lg:border-0',
      links: {
        trailingIcon: {
          base: 'w-4 h-4'
        },
        popover: {
          popper: {
            strategy: 'absolute'
          },
          ui: {
            width: 'w-[16rem]'
          }
        }
      },
      popover: {
        links: {
          active: 'dark:bg-gray-950/50',
          inactive: 'dark:hover:bg-gray-950/50'
        }
      },
      button: {
        icon: {
          open: 'i-ph-list',
          close: 'i-ph-x'
        }
      }
    },
    navigation: {
      accordion: {
        button: {
          trailingIcon: {
            base: 'w-4 h-4'
          }
        }
      }
    },
    page: {
      card: {
        to: 'dark:hover:bg-gray-900/50'
      }
    },
    content: {
      search: {
        fileIcon: {
          name: 'i-ph-file-text-duotone'
        }
      },
      toc: {
        button: {
          trailingIcon: {
            base: 'w-4 h-4'
          }
        }
      },
      surround: {
        icon: {
          prev: 'i-ph-arrow-left',
          next: 'i-ph-arrow-right'
        }
      },
      collapsible: {
        button: {
          icon: {
            base: 'w-3 h-3'
          }
        }
      },
      prose: {
        code: {
          button: {
            icon: {
              copy: 'i-ph-copy-duotone',
              copied: 'i-ph-check-square-duotone'
            }
          },
          icon: {
            terminal: 'i-ph-terminal-window-duotone'
          }
        }
      }
    }
  }
})
