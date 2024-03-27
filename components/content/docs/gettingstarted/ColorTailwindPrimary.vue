<script setup lang="ts">
import colors from '#tailwind-config/theme/colors'
const colorMode = useColorMode()
const appConfig = useAppConfig()

const primaryColors = computed(() => appConfig.ui.colors.filter(color => color !== 'primary').map(color => ({ value: color, text: color, hex: colors[color][colorMode.value === 'dark' ? 400 : 500] })))

const columns = [{
  key: 'id',
  label: '#',
  class: 'italic'
}, {
  key: 'color',
  label: '呈现 (rgb + hex)',
  class: 'font-bold'
}, {
  key: 'present',
  label: '名称',
  class: 'font-bold'
}]

const tailwindColorToRgb = [{
  name: 'sky',
  rgb: {
    400: 'rgb(56 189 248)',
    500: 'rgb(14 165 233)'
  }
}, {
  name: 'red',
  rgb: {
    400: 'rgb(248 113 113)',
    500: 'rgb(239 68 68)'
  }
}, {
  name: 'orange',
  rgb: {
    400: 'rgb(251 146 60)',
    500: 'rgb(249 115 22)'
  }
}, {
  name: 'amber',
  rgb: {
    400: 'rgb(251 191 36)',
    500: 'rgb(245 158 11)'
  }
}, {
  name: 'yellow',
  rgb: {
    400: 'rgb(250 204 21)',
    500: 'rgb(234 179 8)'
  }
}, {
  name: 'lime',
  rgb: {
    400: 'rgb(163 230 53)',
    500: 'rgb(132 204 22)'
  }
}, {
  name: 'green',
  rgb: {
    400: 'rgb(74 222 128)',
    500: 'rgb(34 197 94)'
  }
}, {
  name: 'emerald',
  rgb: {
    400: 'rgb(52 211 153)',
    500: 'rgb(16 185 129)'
  }
}, {
  name: 'teal',
  rgb: {
    400: 'rgb(45 212 191)',
    500: 'rgb(20 184 166)'
  }
}, {
  name: 'cyan',
  rgb: {
    400: 'rgb(34 211 238)',
    500: 'rgb(6 182 212)'
  }
}, {
  name: 'blue',
  rgb: {
    400: 'rgb(96 165 250)',
    500: 'rgb(59 130 246)'
  }
}, {
  name: 'indigo',
  rgb: {
    400: 'rgb(129 140 248)',
    500: 'rgb(99 102 241)'
  }
}, {
  name: 'violet',
  rgb: {
    400: 'rgb(167 139 250)',
    500: 'rgb(139 92 246)'
  }
}, {
  name: 'purple',
  rgb: {
    400: 'rgb(192 132 252)',
    500: 'rgb(168 85 247)'
  }
}, {
  name: 'fuchsia',
  rgb: {
    400: 'rgb(232 121 249)',
    500: 'rgb(217 70 239)'
  }
}, {
  name: 'pink',
  rgb: {
    400: 'rgb(244 114 182)',
    500: 'rgb(236 72 153)'
  }
}, {
  name: 'rose',
  rgb: {
    400: 'rgb(251 113 133)',
    500: 'rgb(244 63 94)'
  }
}]

const items = computed(() => {
  const getColorRgb = (colorName: string) => {
    const color = tailwindColorToRgb.find((color) => color.name === colorName.toLowerCase())
    if (color) {
      const preference = colorMode.preference === 'dark' ? 400 : 500
      return color.rgb[preference]
    }
    return ''
  }

  const getColorHex = (colorName: string) => {
    const color = primaryColors.value.find((color) => color.value === colorName)
    return color.hex
  }

  const generateColorValue = (colorName: string) => `${colorName.toLowerCase()}-${colorMode.preference === 'dark' ? 400 : 500}`

  const createItem = (id: number, colorName: string) => ({
    id,
    present: colorName,
    color: {
      value: generateColorValue(colorName),
      rgbValue: getColorRgb(colorName),
      hex: getColorHex(colorName),
      class: `bg-${generateColorValue(colorName)} dark:bg-${generateColorValue(colorName).replace('-500', '-400')}`
    }
  })

  return primaryColors.value.map((color, index) => createItem(index + 1, color.value))
})
const page = ref(1)
const pageCount = 5

const rows = computed(() => {
  return items.value.slice((page.value - 1) * pageCount, (page.value) * pageCount)
})
</script>

<template>
  <div class="flex border border-gray-200 dark:border-gray-700 relative rounded-md not-prose bg-white dark:bg-gray-900 my-3">
    <div class="relative overflow-x-auto w-full">
      <UTable :rows="rows" :columns="columns">
        <template #color-data="{ row }">
          <span class="text-white dark:text-black font-medium">{{ row.color.rgbValue }}, hex: {{ row.color.hex }}</span>
        </template>
      </UTable>
      <div class="flex justify-end px-3 py-3.5 border-t border-gray-200 dark:border-gray-700">
        <UPagination v-model="page" :page-count="pageCount" :total="items.length" />
      </div>
    </div>
  </div>
</template>

