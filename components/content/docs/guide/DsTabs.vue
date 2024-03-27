<script setup lang="ts">
const items = [{
  key: 'common',
  icon: 'i-ph-fire-duotone',
  label: '常用'
}, {
  key: 'not',
  icon: 'i-ph-dots-three-circle-duotone',
  label: '其他'
}]

</script>

<template>
  <UTabs :items="items" class="w-full">
    <template #default="{ item, selected }">
      <div class="flex items-center gap-2 relative truncate">
        <UIcon :name="item.icon" class="w-4 h-4 flex-shrink-0" />

        <span class="truncate">{{ item.label }}</span>

        <span v-if="selected" class="absolute -right-4 w-2 h-2 rounded-full bg-primary-500 dark:bg-primary-400" />
      </div>
    </template>
    <template #item="{ item }">
      <div class="py-1" />
      <div v-if="item.key === 'common'" class="space-y-3">
        <CardGroup class="sm:grid-cols-3">
          <Card icon="i-simple-icons-r" title="R" to="/docs/guide/r">
            R 是一种功能强大的语言，擅长于各种各样的统计和数据可视化应用程序 - "在专门领域很出色"
          </Card>
          <Card icon="i-simple-icons-pandas" title="Python" to="/docs/guide/py">
            Python 是数据科学语言以及数据可视化的不错选择，而不仅仅是入门级 - "优秀的多面手"
          </Card>
          <Card icon="i-simple-icons-julia" title="Julia" to="/docs/guide/julia">
            Julia 是一种编译语言，有良好的性能。还提供了 Python 这样简单、动态类型和脚本功能的解释语言 - "前景广阔"
          </Card>
        </CardGroup>
      </div>
      <div v-else-if="item.key === 'not'" class="space-y-3">
        <CardGroup class="sm:grid-cols-2">
          <Card icon="i-simple-icons-cplusplus" title="C/C++" to="/docs/guide/cpp">
            虽然 C++ 具有闪电般的性能和广泛的主流普及性，但并不是数据科学的常见选择 - "不适用于日常工作，但如果表现很出色"
          </Card>
          <Card icon="i-devicon-plain-matlab" title="MATLAB" to="/docs/guide/matlab">
            当您的应用程序或日常角色需要密集的高级数学功能时 MATLAB 应该是最佳选择 - "数学密集型应用程序"
          </Card>
          <Card icon="i-devicon-plain-java" title="Java" to="/docs/guide/java">
            Java 的性能和类型安全性是真正的优势。不足之处是对比 Python 和 R 较弱的数据科学生态 - "数据科学的有力竞争者"
          </Card>
          <Card icon="i-simple-icons-perl" title="Perl" to="/docs/guide/perl">
            Perl 被称为 "瑞士军刀的编程语言"，在量化领域如生物信息学中广泛应用，但并不突出，语法也很不友好 - "数据科学领域并不具有优势"
          </Card>
        </CardGroup>
      </div>
    </template>
  </UTabs>
</template>

