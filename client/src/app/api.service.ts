import { Injectable } from '@angular/core';

import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  [x: string]: any;
  private baseUrl = 'https://lab.app.invertebrado.co/api';
  private token: string = '';
  private refreshToken: string = '';
  private Username: string = '';

  async login(username: string, password: string) {
    const body = {
      UserName: username,
      Password: password,
    };

    const response = await axios.post(`${this.baseUrl}/account/login `, body);
    if (response.status === 200) {
      this.Username = response.data.FirstName + '' + response.data.LastName;
      this.token = response.data.Token;
      this.refreshToken = response.data.RefreshToken;

      return response.data;
    } else {
      return new Error('error login in');
    }
  }

  async getSubscribers(
    criteria: string,
    page: number,
    count: number,
    sortOrder: string,
    sortType: number
  ) {
    const params = {
      criteria: criteria,
      page: page,
      count: count,
      sortOrder: sortOrder,
      sortType: sortType,
    };

    try {
      const response = await axios.get(`${this.baseUrl}/subscribers`, {
        params: params,
        headers: { Authorization: `Bearer ${this.token}` },
      });
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  async getSubscriberById(id: number) {
    try {
      const response = await axios.get(`${this.baseUrl}/subscribers/${id}`, {
        headers: { Authorization: `Bearer ${this.token}` },
      });
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  async addSubscriber(subscribers: any) {
    console.log('addSubscriber', subscribers);
    
    try {
      const response = await axios.post(
        `${this.baseUrl}/subscribers/`,
        subscribers,
        { headers: { Authorization: `Bearer ${this.token}` } }
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  async deleteSubscriberById(id: number) {
    const response = await axios.delete(`${this.baseUrl}/subscribers/${id}`, {
      headers: { Authorization: `Bearer ${this.token}` },
    });
    console.log('Id delete', id, response);
    return response;
  }
  

  async updateSubscriberById(id: number, subscriber: any) {
    try {
      const response = await axios.put(`${this.baseUrl}/subscribers/${id}`, 
        subscriber,
        { headers: { Authorization: `Bearer ${this.token}` } }
      );
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  async getCountries(params: any): Promise<any> {
    return axios.get(`${this.baseUrl}/countries`, {
      headers: {
        Authorization: `Bearer ${this.token}`
      },
      params: params
    })
      .then(response => response.data)
      .catch(error => {
        throw new Error(error)
      });
    }
  

  getUserName() {
    return this.Username;
  }

  setToken(token: string) {
    this.token = token;
  }
}
