import { TypeProyectosFrontendSkeleton } from 'contentful/content-types';

export const useUseProjects = () => {
  
  const { $client }   = useNuxtApp()
  const projects = ref<null | any>(null)

  async function getProjects() {
    const response = await $client.getEntry<TypeProyectosFrontendSkeleton>('5Nkgvmy8HnYONX8aq5MYoH');
    return response
  }
  const projectState = useState<any | null>('projects', async () => {
    projects.value = await getProjects()
  })

  return {projects}
}

