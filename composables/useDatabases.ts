import type { Database } from '../types'

export const useDatabases = () => {
  const databases = useState<Database[]>('databases', () => [])

  async function fetchList() {
    if (databases.value.length) {
      return
    }

    try {
      const data = await queryContent<Database>('/databases')
        .where({ _extension: 'md' })
        .without(['body', 'excerpt'])
        .sort({ date: -1 })
        .find()

      databases.value = (data as Database[]).filter(article => article._path !== '/databases')
    }
    catch (e) {
      databases.value = []
      return e
    }
  }

  return {
    databases,
    fetchList
  }
}
