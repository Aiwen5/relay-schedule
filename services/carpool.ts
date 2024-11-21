import { getDB } from '@/database/client';
import { carpools } from '@/database/schema/carpool';
import { users } from '@/database/schema/users';
import { requests } from '@/database/schema/carpoolRequests';
import { childToRequest } from '@/database/schema/requestToChildren';
import { children } from '@/database/schema/children';
import { and, eq, gte, is, lt } from 'drizzle-orm';
import { alias } from 'drizzle-orm/sqlite-core';

const db = getDB();

export const getUpcomingCarpools = async (userId: string) => {
  const today = new Date().toISOString().split('T')[0];

  const driverAlias = alias(users, 'driver');
  const parentAlias = alias(users, 'parent');

  const results = await db
    .select({
      carpoolId: carpools.id,
      startTime: carpools.departureTime,
      startDate: carpools.departureDate,
      startingAddress: carpools.startAddress,
      endingAddress: carpools.endAddress,
      driver: {
        id: driverAlias.id,
        firstName: driverAlias.firstName,
        email: driverAlias.email,
        imageUrl: driverAlias.imageUrl,
      },
      requestId: requests.id,
      startAddress: requests.startingAddress,
      endAddress: requests.endingAddress,
      pickupTime: requests.pickupTime,
      parent: {
        id: parentAlias.id,
        firstName: parentAlias.firstName,
        lastName: parentAlias.lastName,
        email: parentAlias.email,
        imageUrl: parentAlias.imageUrl,
      },
      child: {
        id: children.id,
        firstName: children.firstName,
        schoolId: children.schoolId,
        imageUrl: children.imageUrl,
      },
    })
    .from(carpools)
    .innerJoin(driverAlias, eq(driverAlias.id, carpools.driverId))
    .leftJoin(requests, eq(requests.carpoolId, carpools.id))
    .leftJoin(parentAlias, eq(parentAlias.id, requests.parentId))
    .leftJoin(childToRequest, eq(childToRequest.requestId, requests.id))
    .leftJoin(children, eq(children.id, childToRequest.childId))
    .where(
      and(eq(carpools.driverId, userId), gte(carpools.departureDate, today))
    );

  const groupedResults = results.reduce((acc, row) => {
    const existingCarpool = acc.find((c) => c.carpoolId === row.carpoolId);
    const request = {
      requestId: row.requestId,
      startingAddress: row.startAddress,
      endingAddress: row.endAddress,
      pickupTime: row.pickupTime,
      parent: row.parent,
      child: row.child,
    };

    if (existingCarpool) {
      existingCarpool.requests.push(request);
    } else {
      acc.push({
        carpoolId: row.carpoolId,
        startTime: row.startTime,
        startDate: row.startDate,
        startingAddress: row.startingAddress,
        endingAddress: row.endingAddress,
        driver: row.driver,
        requests: [request],
      });
    }

    return acc;
  }, []);

  return groupedResults;
};

export const getOngoingCarpools = async (userId: string) => {
  const today = new Date().toISOString().split('T')[0];

  const driverAlias = alias(users, 'driver');
  const parentAlias = alias(users, 'parent');

  const results = await db
    .select({
      carpoolId: carpools.id,
      startTime: carpools.departureTime,
      startDate: carpools.departureDate,
      startingAddress: carpools.startAddress,
      endingAddress: carpools.endAddress,
      driver: {
        id: driverAlias.id,
        firstName: driverAlias.firstName,
        email: driverAlias.email,
        imageUrl: driverAlias.imageUrl,
      },
      requestId: requests.id,
      startAddress: requests.startingAddress,
      endAddress: requests.endingAddress,
      pickupTime: requests.pickupTime,
      parent: {
        id: parentAlias.id,
        firstName: parentAlias.firstName,
        lastName: parentAlias.lastName,
        email: parentAlias.email,
        imageUrl: parentAlias.imageUrl,
      },
      child: {
        id: children.id,
        firstName: children.firstName,
        schoolId: children.schoolId,
        imageUrl: children.imageUrl,
      },
    })
    .from(carpools)
    .innerJoin(driverAlias, eq(driverAlias.id, carpools.driverId))
    .leftJoin(requests, eq(requests.carpoolId, carpools.id))
    .leftJoin(parentAlias, eq(parentAlias.id, requests.parentId))
    .leftJoin(childToRequest, eq(childToRequest.requestId, requests.id))
    .leftJoin(children, eq(children.id, childToRequest.childId))
    .where(
      and(eq(carpools.driverId, userId), eq(carpools.departureDate, today))
    );

  const groupedResults = results.reduce((acc, row) => {
    const existingCarpool = acc.find((c) => c.carpoolId === row.carpoolId);
    const request = {
      requestId: row.requestId,
      startingAddress: row.startAddress,
      endingAddress: row.endAddress,
      pickupTime: row.pickupTime,
      parent: row.parent,
      child: row.child,
    };

    if (existingCarpool) {
      existingCarpool.requests.push(request);
    } else {
      acc.push({
        carpoolId: row.carpoolId,
        startTime: row.startTime,
        startDate: row.startDate,
        startingAddress: row.startingAddress,
        endingAddress: row.endingAddress,
        driver: row.driver,
        requests: [request],
      });
    }

    return acc;
  }, []);

  return groupedResults;
};

export const getPastCarpools = async (userId: string) => {
  const today = new Date().toISOString().split('T')[0];

  const driverAlias = alias(users, 'driver');
  const parentAlias = alias(users, 'parent');

  const results = await db
    .select({
      carpoolId: carpools.id,
      startTime: carpools.departureTime,
      startDate: carpools.departureDate,
      startingAddress: carpools.startAddress,
      endingAddress: carpools.endAddress,
      driver: {
        id: driverAlias.id,
        firstName: driverAlias.firstName,
        email: driverAlias.email,
        imageUrl: driverAlias.imageUrl,
      },
      requestId: requests.id,
      startAddress: requests.startingAddress,
      endAddress: requests.endingAddress,
      pickupTime: requests.pickupTime,
      parent: {
        id: parentAlias.id,
        firstName: parentAlias.firstName,
        lastName: parentAlias.lastName,
        email: parentAlias.email,
        imageUrl: parentAlias.imageUrl,
      },
      child: {
        id: children.id,
        firstName: children.firstName,
        schoolId: children.schoolId,
        imageUrl: children.imageUrl,
      },
    })
    .from(carpools)
    .innerJoin(driverAlias, eq(driverAlias.id, carpools.driverId))
    .leftJoin(requests, eq(requests.carpoolId, carpools.id))
    .leftJoin(parentAlias, eq(parentAlias.id, requests.parentId))
    .leftJoin(childToRequest, eq(childToRequest.requestId, requests.id))
    .leftJoin(children, eq(children.id, childToRequest.childId))
    .where(
      and(eq(carpools.driverId, userId), lt(carpools.departureDate, today))
    );

  const groupedResults = results.reduce((acc, row) => {
    const existingCarpool = acc.find((c) => c.carpoolId === row.carpoolId);
    const request = {
      requestId: row.requestId,
      startingAddress: row.startAddress,
      endingAddress: row.endAddress,
      pickupTime: row.pickupTime,
      parent: row.parent,
      child: row.child,
    };

    if (existingCarpool) {
      existingCarpool.requests.push(request);
    } else {
      acc.push({
        carpoolId: row.carpoolId,
        startTime: row.startTime,
        startDate: row.startDate,
        startingAddress: row.startingAddress,
        endingAddress: row.endingAddress,
        driver: row.driver,
        requests: [request],
      });
    }

    return acc;
  }, []);

  return groupedResults;
};

export const getUpcomingRequestsForParent = async (userId: string) => {
  const today = new Date().toISOString().split('T')[0];

  const driverAlias = alias(users, 'driver');

  const results = await db
    .select({
      requestId: requests.id,
      startAddress: requests.startingAddress,
      endAddress: requests.endingAddress,
      pickupTime: requests.pickupTime,
      isApproved: requests.isApproved,
      carpool: {
        id: carpools.id,
        startTime: carpools.departureTime,
        startDate: carpools.departureDate,
        startingAddress: carpools.startAddress,
        endingAddress: carpools.endAddress,
      },
      driver: {
        id: driverAlias.id,
        firstName: driverAlias.firstName,
        email: driverAlias.email,
        imageUrl: driverAlias.imageUrl,
      },
      child: {
        id: children.id,
        firstName: children.firstName,
        schoolId: children.schoolId,
        imageUrl: children.imageUrl,
      },
    })
    .from(requests)
    .leftJoin(carpools, eq(carpools.id, requests.carpoolId))
    .innerJoin(driverAlias, eq(driverAlias.id, carpools.driverId))
    .leftJoin(childToRequest, eq(childToRequest.requestId, requests.id))
    .leftJoin(children, eq(children.id, childToRequest.childId))
    .where(
      and(eq(requests.parentId, userId), gte(carpools.departureDate, today))
    );

  const groupedResults = results.reduce(
    (acc, row) => {
      const existingRequest = acc.find((r) => r.requestId === row.requestId);
      const child = row.child;

      if (existingRequest) {
        existingRequest.children.push(child);
      } else {
        acc.push({
          requestId: row.requestId,
          startAddress: row.startAddress,
          endAddress: row.endAddress,
          pickupTime: row.pickupTime,
          isApproved: row.isApproved,
          carpool: row.carpool,
          driver: row.driver,
          children: [child],
        });
      }

      return acc;
    },
    [] as Array<{
      requestId: string;
      startAddress: string;
      endAddress: string;
      pickupTime: string;
      isApproved: number;
      carpool: {
        id: string;
        startTime: string;
        startDate: string;
        startingAddress: string;
        endingAddress: string;
      } | null;
      driver: {
        id: string;
        firstName: string;
        email: string;
        imageUrl: string;
      } | null;
      children: Array<{
        id: string;
        firstName: string;
        schoolId: string;
        imageUrl: string;
      }>;
    }>
  );
  
  return groupedResults;
};

export const getOngoingRequestsForParent = async (userId: string) => {
  const today = new Date().toISOString().split('T')[0];

  const driverAlias = alias(users, 'driver');

  const results = await db
    .select({
      requestId: requests.id,
      startAddress: requests.startingAddress,
      endAddress: requests.endingAddress,
      pickupTime: requests.pickupTime,
      isApproved: requests.isApproved,
      carpool: {
        id: carpools.id,
        startTime: carpools.departureTime,
        startDate: carpools.departureDate,
        startingAddress: carpools.startAddress,
        endingAddress: carpools.endAddress,
      },
      driver: {
        id: driverAlias.id,
        firstName: driverAlias.firstName,
        email: driverAlias.email,
        imageUrl: driverAlias.imageUrl,
      },
      child: {
        id: children.id,
        firstName: children.firstName,
        schoolId: children.schoolId,
        imageUrl: children.imageUrl,
      },
    })
    .from(requests)
    .leftJoin(carpools, eq(carpools.id, requests.carpoolId))
    .innerJoin(driverAlias, eq(driverAlias.id, carpools.driverId))
    .leftJoin(childToRequest, eq(childToRequest.requestId, requests.id))
    .leftJoin(children, eq(children.id, childToRequest.childId))
    .where(
      and(eq(requests.parentId, userId), eq(carpools.departureDate, today))
    );

  const groupedResults = results.reduce((acc, row) => {
    const existingRequest = acc.find((r) => r.requestId === row.requestId);
    const child = row.child;

    if (existingRequest) {
      existingRequest.children.push(child);
    } else {
      acc.push({
        requestId: row.requestId,
        startAddress: row.startAddress,
        endAddress: row.endAddress,
        pickupTime: row.pickupTime,
        isApproved: row.isApproved,
        carpool: row.carpool,
        driver: row.driver,
        children: [child],
      });
    }

    return acc;
  }, []);

  return groupedResults;
};

export const getPastRequestsForParent = async (userId: string) => {
  const today = new Date().toISOString().split('T')[0];

  const driverAlias = alias(users, 'driver');

  const results = await db
    .select({
      requestId: requests.id,
      startAddress: requests.startingAddress,
      endAddress: requests.endingAddress,
      pickupTime: requests.pickupTime,
      isApproved: requests.isApproved,
      carpool: {
        id: carpools.id,
        startTime: carpools.departureTime,
        startDate: carpools.departureDate,
        startingAddress: carpools.startAddress,
        endingAddress: carpools.endAddress,
      },
      driver: {
        id: driverAlias.id,
        firstName: driverAlias.firstName,
        email: driverAlias.email,
        imageUrl: driverAlias.imageUrl,
      },
      child: {
        id: children.id,
        firstName: children.firstName,
        schoolId: children.schoolId,
        imageUrl: children.imageUrl,
      },
    })
    .from(requests)
    .leftJoin(carpools, eq(carpools.id, requests.carpoolId))
    .innerJoin(driverAlias, eq(driverAlias.id, carpools.driverId))
    .leftJoin(childToRequest, eq(childToRequest.requestId, requests.id))
    .leftJoin(children, eq(children.id, childToRequest.childId))
    .where(
      and(eq(requests.parentId, userId), lt(carpools.departureDate, today))
    );

  const groupedResults = results.reduce((acc, row) => {
    const existingRequest = acc.find((r) => r.requestId === row.requestId);
    const child = row.child;

    if (existingRequest) {
      existingRequest.children.push(child);
    } else {
      acc.push({
        requestId: row.requestId,
        startAddress: row.startAddress,
        endAddress: row.endAddress,
        pickupTime: row.pickupTime,
        isApproved: row.isApproved,
        carpool: row.carpool,
        driver: row.driver,
        children: [child],
      });
    }

    return acc;
  }, []);

  return groupedResults;
};
