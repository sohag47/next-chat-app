"use client";
import {Icon} from "@iconify/react";
import {Card, CardBody, CardHeader} from "@nextui-org/react";

import images from "@/app/images";
import Image from "next/image";
import { libraryDashboardDB } from "@/assets/db/library-dashboard.db";
import BarChart from "../library/bar-chart";
import DoughnutChart from "../library/doughnut-chart";

export default function UserServiceRoot() {
  return (
    <div className="grid md:grid-cols-5 gap-3 md:py-2 mb-1">
      <div className="w-full md:h-[80vh] lg:col-span-2 col-span-5">
        <Card className="h-fit">
          <CardBody className="grid lg:grid-cols-2 md:grid-cols-4 grid-cols-2 gap-3 h-fit">
            {libraryDashboardDB.map(({color, icon, name, number}, index) => (
              <div
                key={index + 1}
                className={`text-light rounded-lg p-4 text-center font-medium`}
                style={{backgroundColor: color}}
              >
                <p className="text-sm font-semibold">{name}</p>
                <Icon className="xl:w-fit w-10 xl:h-10 h-10 mx-auto" icon={icon} />
                <p className="text-sm font-semibold">{number}</p>
              </div>
            ))}
          </CardBody>
        </Card>
      </div>
      <div className="grid grid-cols-1 gap-3 w-full h-full md:h-[81vh] lg:col-span-2 md:col-span-4 col-span-5">
        <Card shadow="lg">
          <CardBody className="w-full h-full m-2">
            <h2 className="text-center flex font-semibold text-dark dark:text-light">
              Transaction Report
            </h2>
            <BarChart />
          </CardBody>
        </Card>
        <Card shadow="lg">
          <CardBody className="w-full h-full overflow-hidden">
            <h2 className="text-center flex font-semibold text-dark dark:text-light">
              Revenue & Goal
            </h2>
            <DoughnutChart />
          </CardBody>
        </Card>
      </div>
      <Card className="md:col-span-1 col-span-5 bg-gradient-to-b from-primary to-secondary rounded-xl relative md:h-[81vh] h-96 shadow-2xl">
        <CardBody>
          <p className="text-center p-3 font-medium absolute md:top-20 leading-loose text-light text-base">
            <span className="text-warning">LibMaster</span> constantly evolving to meet the{" "}
            <span className="text-warning">changing needs</span> of their
            <span className="text-warning"> communities</span>
          </p>
          <Image
            className="absolute bottom-0 3xl:left-8 md:left-0 left-12"
            src={images.library_dashboard_missile}
            alt="Library Dashboard Sidebar Image"
          />
        </CardBody>
      </Card>
    </div>
  );
}
