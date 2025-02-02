/**
 * This Api class lets you define an API endpoint and methods to request
 * data and process it.
 *
 * See the [Backend API Integration](https://docs.infinite.red/ignite-cli/boilerplate/app/services/#backend-api-integration)
 * documentation for more details.
 */
import { ApiResponse, ApisauceInstance, create } from "apisauce"
import Config from "../../config"
import { GeneralApiProblem, getGeneralApiProblem } from "./apiProblem"
import type { ApiConfig, ApiFeedResponse } from "./api.types"
import type { EpisodeSnapshotIn } from "../../models/Episode"
import { CardSnapshotIn } from "@/models/Card"
import { faker } from "@faker-js/faker/."

/**
 * Configuring the apisauce instance.
 */
export const DEFAULT_API_CONFIG: ApiConfig = {
  url: Config.API_URL,
  timeout: 10000,
}

/**
 * Manages all requests to the API. You can use this class to build out
 * various requests that you need to call from your backend API.
 */
export class Api {
  apisauce: ApisauceInstance
  config: ApiConfig

  /**
   * Set up our API instance. Keep this lightweight!
   */
  constructor(config: ApiConfig = DEFAULT_API_CONFIG) {
    this.config = config
    this.apisauce = create({
      baseURL: this.config.url,
      timeout: this.config.timeout,
      headers: {
        Accept: "application/json",
      },
    })
  }

  async getCard(): Promise<{ kind: "ok"; card: CardSnapshotIn } | GeneralApiProblem> {
    // const response: ApiResponse<ApiFeedResponse> = await this.apisauce.get(`/cards/${cardId}`)

    // if (!response.ok) {
    //   const problem = getGeneralApiProblem(response)
    //   if (problem) return problem
    // }
    const mockColors = ["rgba(26, 52, 63, 1)", "rgba(142, 173, 187, 1)", "rgba(180, 140, 76, 1)"]

    const mockCards = Array.from({ length: 3 }, (_, index) => ({
      id: faker.string.uuid(),
      name: faker.commerce.productName(),
      description: faker.lorem.sentence(),
      image: faker.image.url(),
      points: faker.number.int({ min: 100, max: 1000 }),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      companyLogo: faker.image.url(),
      storeName: faker.company.name(),
      maxPoints: faker.number.int({ min: 1000, max: 10000 }),
      rewardsAvailable: faker.number.int({ min: 1, max: 10 }),
      brandColor: mockColors[index % mockColors.length],
    }))

    return { kind: "ok", card: mockCards[0] }
  }

  async getCards(): Promise<{ kind: "ok"; cards: CardSnapshotIn[] } | GeneralApiProblem> {
    // const response: ApiResponse<ApiFeedResponse> = await this.apisauce.get(`/cards`)

    // if (!response.ok) {
    //   const problem = getGeneralApiProblem(response)
    //   if (problem) return problem
    // }

    const mockColors = ["rgba(26, 52, 63, 1)", "rgba(142, 173, 187, 1)", "rgba(180, 140, 76, 1)"]

    const mockCards = Array.from({ length: 3 }, (_, index) => ({
      id: faker.string.uuid(),
      name: faker.commerce.productName(),
      description: faker.lorem.sentence(),
      image: faker.image.url(),
      points: faker.number.int({ min: 100, max: 1000 }),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      companyLogo: faker.image.url(),
      storeName: faker.company.name(),
      maxPoints: faker.number.int({ min: 1000, max: 10000 }),
      rewardsAvailable: faker.number.int({ min: 1, max: 10 }),
      brandColor: mockColors[index % mockColors.length],
    }))

    return { kind: "ok", cards: mockCards }
  }

  /**
   * Gets a list of recent React Native Radio episodes.
   */
  async getEpisodes(): Promise<{ kind: "ok"; episodes: EpisodeSnapshotIn[] } | GeneralApiProblem> {
    // make the api call
    const response: ApiResponse<ApiFeedResponse> = await this.apisauce.get(
      `api.json?rss_url=https%3A%2F%2Ffeeds.simplecast.com%2FhEI_f9Dx`,
    )

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    // transform the data into the format we are expecting
    try {
      const rawData = response.data

      // This is where we transform the data into the shape we expect for our MST model.
      const episodes: EpisodeSnapshotIn[] =
        rawData?.items.map((raw) => ({
          ...raw,
        })) ?? []

      return { kind: "ok", episodes }
    } catch (e) {
      if (__DEV__ && e instanceof Error) {
        console.error(`Bad data: ${e.message}\n${response.data}`, e.stack)
      }
      return { kind: "bad-data" }
    }
  }
}

// Singleton instance of the API for convenience
export const api = new Api()
